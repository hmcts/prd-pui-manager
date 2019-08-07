import * as express from 'express'
import {http} from '../lib/http'
import { generateS2sToken } from '../lib/s2sTokenGeneration'
import {config} from '../lib/config';
import axios from 'axios';
import {logger} from 'codelyzer/util/logger';

export const router = express.Router({mergeParams: true})

// Works and we can hit it.
router.post('/register', async (req, res) => {
  console.log('prdTest')

  console.log('+================================')
  console.log(req.body)

  const prdUrl = config.services.rdProfessionalApi

  const token = generateS2sToken()
  console.log(token)
  if(!token) {
    res.send('No token generated')
  }

  logger.info('Adding s2s token to defaults')
  req.headers.ServiceAuthorization = `Bearer ${token}`

  axios.defaults.headers.common.ServiceAuthorization = req.headers.ServiceAuthorization

  try {
    const response = await http.post(`${prdUrl}/refdata/internal/v1/organisations`, req.body)
    res.send(response.data)
  } catch (error) {
    const errReport = {
      apiError: error.data.errorMessage,
      apiErrorDescription: error.data.errorDescription,
      statusCode: error.status,
    }
    console.log('error')
    console.log(error)
    res.send(errReport).status(418)
  }
});

export default router
