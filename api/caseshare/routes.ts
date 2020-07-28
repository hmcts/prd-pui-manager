import * as express from 'express'
import * as restAPI from './index'

export const router = express.Router({ mergeParams: true })

router.get('/', restAPI.getRoot)
router.get('/db', restAPI.getDB)
router.get('/orgs', restAPI.getOrgs)
router.get('/orgs/:orgId/users', restAPI.getUsersByOrgId)
router.get('/orgs/:orgId/users/:uid', restAPI.getUserByOrgAndUserId)
router.get('/users', restAPI.getUsers)
router.get('/cases', restAPI.getCases)
router.get('/cases/:caseId', restAPI.getCaseById)