/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiResponse
} from '@elastic/elasticsearch'
import { Request, Response } from 'express'
import { IComment } from '~/models/esInterfaces'
import { esClient } from './elasticSearch'

export const create = async (
  req: Request, res: Response
) => {
  try {
    const { parentId } = req.params
    // /:type/:postId
    const body: IComment = req.body
    const bodyData = {
      body: {
        // authorId: req["payload"].userId,
        text: body.text,
        parentId: parentId ?? '',
        parentTitle: parentId ?? '',
        comments: 0,
        likes: 0,
        modifiedDate: new Date(),
        createdDate: new Date()
      },
      index: 'comments'
    }

    await esClient.index(bodyData)
    return res.send(true)
  } catch (error) {
    console.error('create comment failed with:', error)
    return res.send(false)
  }
}

export const update = async (
  req: Request, res: Response
) => {
  try {
    const body: IComment = req.body
    const bodyData = {
      body: {
        // authorId: req["payload"].userId,
        text: body.text,
        parentId: body.parentId ?? '',
        parentTitle: body.parentTitle ?? '',
        comments: 0,
        likes: 0,
        modifiedDate: new Date(),
        createdDate: new Date()
      },
      index: 'comments',
      id: body.id ?? ''
    }

    await esClient.update(bodyData)
    return res.send(true)
  } catch (error) {
    console.error('update comment failed with:', error)
    return res.send(error)
  }
}

export const meta = async (
  req: Request, res: Response
) => {
  try {
    const { postId } = req.params
    const resp: ApiResponse = await esClient.get({
      index: 'post',
      id: postId
    })
    if (resp.statusCode === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const metaResp: any = resp.body
      return res.json({ metaResp })
    } else {
      console.log('could not find post')
      return
    }
  } catch (error) {
    return res.json(error)
  }
}

// it uses the DriverSearchParameters to build an Elastic Search query
export const find = async (
  req: Request, res: Response
) => {
  try {
    const { id } = req.params
    const results: ApiResponse = await esClient.search({
      index: 'comments',
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  parentId: id ?? ''
                }
              }
            ]
          }
        },

        size: 10,
        sort: [
          {
            createdDate: {
              order: 'desc'
            }
          }
        ]
      }
    })
    const collect: IComment[] = []
    let count = 0
    if (results.statusCode === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arr: any[] = results.body.hits.hits
      count = arr.length
      arr.forEach((item) => {
        const source = item._source
        collect.push(Object.assign({}, { id: item._id }, source))
      })
    }

    return res.json({ comments: collect, count })
  } catch (error) {
    return res.json(error)
  }
}

export async function sendAnonomousFeedBack (req: Request, res: Response) {
  try {
    const { email, text, postId } = req.body
    console.log(text)
    const bodyData = {
      body: {
        // authorId: req["payload"].userId,
        text: text ?? '',
        email: email ?? '',
        postId: postId ?? '',
        seen: false,
        modifiedDate: new Date(),
        createdDate: new Date()
      },
      type: '_doc',
      index: 'feedback'
    }

    await esClient.index(bodyData)
    return res.send(true)
  } catch (error) {
    console.error('create comment failed with:', error)
    return res.send(false)
  }
}
// createIndex creates the elastic search index if it doesn't exist
// can also be configured to preform a migration of the index to a new index if there are changes that need to be ported
// this migration option is used by the migration.ts file found in the scripts folder of the listen-and-sync package
export const createIndex = async (
  isMigration: boolean
): Promise<boolean> => {
  try {
    const settings = {
      analysis: {
        analyzer: {
          city_analyzer: {
            filter: ['lowercase', 'asciifolding'],
            tokenizer: 'standard'
          },
          email_analyzer: {
            tokenizer: 'email_tokenizer'
          },
          phone_analyzer: {
            char_filter: ['digit_only'],
            filter: ['trim'],
            tokenizer: 'phone_tokenizer'
          },
          street_analyzer: {
            filter: ['lowercase', 'asciifolding', 'synonym'],
            tokenizer: 'standard'
          }
        },
        char_filter: {
          digit_only: {
            pattern: '\\D+',
            replacement: '',
            type: 'pattern_replace'
          }
        },
        filter: {
          synonym: {
            synonyms: [
              'bd => boulevard',
              'av => avenue',
              'ave => avenue',
              'r => rue',
              'rte => route',
              'rd => road',
              'cv => cove',
              'ct => court'
            ],
            type: 'synonym'
          }
        },
        tokenizer: {
          email_tokenizer: {
            tokenize_on_chars: ['@'],
            type: 'char_group'
          },
          phone_tokenizer: {
            token_chars: ['digit'],
            // min_gram: 1,
            // max_gram: 2,
            type: 'ngram'
          }
        }
      }
    }
    const mappings = {
      properties: {
        accessories: { type: 'text' },
        address: {
          properties: {
            city: {
              analyzer: 'city_analyzer',
              fields: { keyword: { type: 'keyword' } },
              type: 'text'
            },
            state: { type: 'keyword' },
            street: { analyzer: 'street_analyzer', type: 'text' },
            zipcode: { type: 'keyword' }
          }
        },
        background_check: { type: 'boolean' },
        banned: { type: 'boolean' },
        capabilities: { type: 'text' },
        delivery_count: { type: 'integer' },
        email: {
          analyzer: 'email_analyzer',
          type: 'text'
        },
        external_id: { type: 'text' },
        id: { type: 'integer' },
        is_on_delivery: { type: 'boolean' },
        last_check_in: { type: 'date' },
        last_delivery_date: { type: 'date' },
        location: { type: 'geo_point' },
        location_meta: {
          properties: {
            accuracy: { type: 'double' },
            activity_confidence: { type: 'integer' },
            activity_type: { type: 'text' },
            altitude: { type: 'double' },
            heading: { type: 'double' },
            speed: { type: 'double' },
            tracking_activated: { type: 'boolean' }
          }
        },
        name: { type: 'text' },
        note: { type: 'text' },
        phone_number: { analyzer: 'phone_analyzer', type: 'text' },
        rating: { type: 'double' },
        review_count: { type: 'integer' },
        third_party: { type: 'boolean' },
        vehicle_type: { type: 'keyword' },
        vehicles: {
          properties: {
            body_type: { type: 'text' },
            cargo_capacity: { type: 'text' },
            make: { type: 'text' },
            max_payload: { type: 'integer' },
            max_tow: { type: 'integer' },
            model: { type: 'text' },
            trim: { type: 'text' },
            year: { type: 'integer' }
          }
        }
      }
    }

    const randomSuffix = (Math.random() + 1).toString(36).substring(7)
    const newIndexName = `${'ALIAS_NAME'}-${randomSuffix}`
    // fetch the current index
    const indexes: ApiResponse = await esClient.indices.get({
      index: `${'ALIAS_NAME'}-*`
    })
    const oldIndexName = Object.keys(indexes.body)[0]
    // if the index is not undefined, an index exists
    const indexExist = oldIndexName !== undefined

    // return if an index exist and this isn't a migration
    if (indexExist && !isMigration) {
      return Promise.resolve(true)
    }

    console.log(`Creating new index: ${newIndexName}`)
    await esClient.indices.create({
      body: {
        mappings: { ...mappings },
        settings: { ...settings }
      },
      index: newIndexName
    })

    // this is an existing index, so migrate
    if (isMigration) {
      // run migration
      console.log('Running migration')

      if (indexExist) {
        console.log(`Deleting old index: ${oldIndexName}`)
        await esClient.indices.delete({
          index: oldIndexName
        })
      }
    }

    console.log('updating alias')
    await esClient.indices.putAlias({
      body: {
        is_write_index: true
      },
      index: newIndexName,
      name: 'ALIAS_NAME'
    })

    return Promise.resolve(true)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// createDriver converts from a curri/db Driver object model to an ESdriver
export const createDriver = (data: any) => {
  const address = {
    city: data.city,
    latitude: data.latitude,
    longitude: data.longitude,
    state: data.state,
    streetName: data.addressLine1,
    streetName2: data.addressLine2,
    zipcode: data.postalCode
  }
  const driver = {
    accessories: data.accessories,
    address,
    backgroundCheck: data.turnData?.state === 'BG_STATE_APPROVED',
    banned: data.banned,
    capabilities: data.capabilities,
    deliveryCount: data.deliveryCount,
    email: data.emailAddress,
    externalId: data.externalId,
    id: data.id,
    isOnDelivery: data.isOnActiveDelivery ?? false,
    lastCheckIn: data.lastCheckIn,
    lastDeliveryDate: data.lastDeliveryDate,
    location: data.location,
    locationMeta: data.locationMeta,
    name: `${data.firstName} ${data.lastName}`,
    note: data.note,
    phoneNumber: data.phone ?? data.phoneNumber,
    rating: data.rating,
    reviewCount: data.reviewCount,
    thirdParty: data.thirdParty,
    vehicleType: data.vehicleType,
    vehicles: data.vehicles ?? []
  }

  return driver
}
