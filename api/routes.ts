import * as express from 'express'
import accountsRouter from './accounts'
import * as auth from './auth'
import inviteUser from './inviteUser'
import getappInsightsInstrumentationKey from './monitoring-tools'
import organisationRouter from './organisation'
import stateRouter from './states'
import userDetailsRouter from './user'
import getUserList from './userList'

const router = express.Router({ mergeParams: true })

router.use(auth.attach) // attach user-profile to all api routes

router.use('/logout', (req, res, next) => {
    auth.doLogout(req, res)
})
router.use('/decisions', stateRouter)
router.use('/organisation', organisationRouter)
router.use('/accounts', accountsRouter)
router.use('/user', userDetailsRouter)
router.use('/inviteUser', inviteUser)
router.use('/userList', getUserList)
router.use('/userDetails', getUserList)
router.use('/monitoring-tools', getappInsightsInstrumentationKey)

export default router
