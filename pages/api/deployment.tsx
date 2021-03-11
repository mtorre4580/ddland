import type { NextApiRequest, NextApiResponse } from 'next';
import deploymentBadgeHandler from 'deployment-badge';

// My deployment status, change it if you fork the repo https://api.github.com/repos/{user}/{repo}/deployments
const DEPLOYMENT_STATUS_URL = 'https://api.github.com/repos/mtorre4580/ddland/deployments';

/**
 * Handler to notify when the deploy has finish and the status
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await deploymentBadgeHandler(req, res, {
    deploymentsUrl: DEPLOYMENT_STATUS_URL,
    namedLogo: 'vercel',
    env: 'Production',
  });
};

export default handler;
