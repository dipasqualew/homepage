// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit } from '@octokit/core'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const config = {
  owner: 'dipasqualew',
  repo: 'homepage',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
}

type CheckRun = object & { id: number };
type RepoJobs = {
  build: CheckRun;
  test: CheckRun;
  deploy: CheckRun;
};

const getMainCheckRuns = async (): Promise<RepoJobs> => {
  const checkRuns = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
    owner: config.owner,
    repo: config.repo,
    ref: 'main',
    headers: config.headers,
  });

  const [deploy, test, build] = checkRuns.data.check_runs;

  return { build, test, deploy };
};

const getCheckRunAnnotations = async (checkRunId: number) => {
  const annotations = await octokit.request('GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations', {
    owner: config.owner,
    repo: config.repo,
    check_run_id: checkRunId,
    headers: config.headers,
  });

  return annotations.data;
};

const getMainBuildSize = async () => {
  const { build } = await getMainCheckRuns();

  const annotations = await getCheckRunAnnotations(build.id);

  const buildSizeAnnotation = annotations.find((annotation) => annotation.title === 'Build Size');

  if (!buildSizeAnnotation) {
    throw new Error('Could not find the Build Size annotation.')
  }

  return buildSizeAnnotation.message?.match(/(\d+)/)?.[1];
};

const main = async () => {
  const buildSize = await getMainBuildSize();

  console.log(buildSize);
};

await main();
