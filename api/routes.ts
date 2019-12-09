import * as express from 'express'
import accountsRouter from './accounts'
import * as auth from './auth'
import healthCheck from './healthCheck'
import inviteUser from './inviteUser'
import getJurisdictions from './jurisdictions'
import organisationRouter from './organisation'
import payments from './payments'
import userDetailsRouter from './user'
import getUserDetails from './userDetails'
import getUserList from './userList'

const router = express.Router({ mergeParams: true })

router.use(auth.attach)
router.use('/organisation', organisationRouter)
router.use('/accounts', accountsRouter)
router.use('/user', userDetailsRouter)
router.use('/healthCheck', healthCheck)
router.use('/inviteUser', inviteUser)
router.use('/userList', getUserList)
router.use('/userDetails', getUserDetails)
router.use('/jurisdictions', getJurisdictions)
router.use('/payments/:account', payments)

export default router
