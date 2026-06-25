import type { Request, Response, NextFunction } from 'express'
import { createPolicy, getPolicies, getPolicyById, updatePolicy, deletePolicy } from './policies.services.js'

export const createPolicyController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const policy = await createPolicy(req.body, (req as any).user.id)
        return res.status(201).json(
            {
                 policy 
            }
        )
    } catch (e) 
    { 
        next(e)
     }
}


export const getPoliciesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const policies = await getPolicies()

        return res.status(200).json(
            { 
                policies 
            }
        )
    } catch (e) 
    { 
        next(e) 
    }

}

export const getPolicyByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const policy = await getPolicyById(req.params.id as string)

        if (!policy) 
        {
            return res.status(404).json(
                { 
                    message: 'Policy not found' 
                }
            )
        }

    return res.status(200).json(
        { 
            policy
         }
        )


    } 
    catch (e) 
    { 
        next(e) 
    }
}

export const updatePolicyController = async (req: Request, res: Response, next: NextFunction) => {
  
    try {
        const policy = await updatePolicy(req.params.id as string, req.body, (req as any).user.id)

        return res.status(200).json(
             {
                 policy
             }
        )

    } 
    catch (e) 
    {
         next(e)
     }
}


export const deletePolicyController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deletePolicy(req.params.id as string, (req as any).user.id)

        return res.status(204).send()

    } 
    catch (e) 
    { 
        next(e) 
    }
}