import * as express from 'express'
import {getConfigValue} from '../configuration'
import {
  PROTOCOL,
  SERVICES_IDAM_WEB,
} from '../configuration/references'

export const router = express.Router({mergeParams: true})

router.get('/', configurationUIRoute)

/**
 * All the following environmental variables are passed to the UI.
 */
async function configurationUIRoute(req, res) {
  res.status(200).send({
    idamWeb: getConfigValue(SERVICES_IDAM_WEB),
    protocol: getConfigValue(PROTOCOL)
  })
}

export default router
