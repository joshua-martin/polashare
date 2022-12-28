import { CommonRoutesConfig } from "../common/common.routes.config"
import express from 'express';
import usersController from "./controllers/users.controller";
import usersMiddleware from "./middleware/users.middleware";
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import { body } from 'express-validator';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        
        this.app.route(`/users`)
            .get(
                jwtMiddleware.validJWTNeeded,
                usersController.listUsers
            )
            .post(
                body('email').isEmail(),
                body('password').isLength({ min: 5}).withMessage('Must include password (5+ characters)'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                usersMiddleware.validateSameEmailDoesntExist,
                usersController.createUser
            );

        this.app.param(`userId`, usersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(
                jwtMiddleware.validJWTNeeded,
                usersMiddleware.validateUserExists
            )
            .get(usersController.getUserById)
            .delete(usersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            usersMiddleware.validateSameEmailBelongToSameUser,
            usersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)').optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            usersMiddleware.validatePatchEmail,
            usersController.patch,
        ]);

        return this.app;
    }
}