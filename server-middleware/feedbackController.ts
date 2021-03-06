import { ApiResponse } from '@elastic/elasticsearch'
import { Request, Response } from 'express'

import { esClient } from './elasticSearch'

export async function sendAnonomousFeedBack (req: Request, res: Response) {
  try {
    const { email, text, postId, response } = req.body
    const bodyData = {
      body: {
        // authorId: req["payload"].userId,
        text: text ?? '',
        email: email ?? '',
        postId: postId ?? '',
        response: response ?? false,
        seen: false,
        modifiedDate: new Date(),
        createdDate: new Date()
      },
      index: 'feedback'
    }

    const esResponse = await esClient.index(bodyData)
    if (esResponse) {
      return res.send(true)
    } else {
      console.error('create feedback failed with:')
      return res.send(false)
    }
  } catch (error) {
    console.error('create feedback failed with:', error)
    return res.send(false)
  }
}

export const seeFeedBack = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const results: ApiResponse = await esClient.search({
      index: 'feedback',
      body: {
        query: {
          match_phrase: {
            postId: postId ?? ''
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
    const collect: any[] = []
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

    return res.json({ feedback: collect, count })
  } catch (error) {
    return res.json(error)
  }
}

export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const deleteResp: ApiResponse = await esClient.delete({
      index: 'feedback',
      id: postId
    })

    return res.json({ deleteResp })
  } catch (error) {
    return res.json(error)
  }
}

export const password = (req: Request, res: Response) => {
  const type = req.params.type
  if (type === 'admin' && req.body.password === process.env.ADMINPASSWORD) {
    res.json({ data: true })
  } else if (!type && req.body.password === process.env.password) {
    res.json({ data: true })
  } else {
    res.status(400)
  }
}
