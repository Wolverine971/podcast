/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Client
} from '@elastic/elasticsearch'

const isProd = process.env.IS_PROD === 'true'

const defaultConfig = isProd
  ? {
    node: process.env.ELASTIC_END_POINT
  }
  : {
    node: 'http://localhost:9200'
  }

export const esClient = new Client(defaultConfig)
