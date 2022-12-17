const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

// CLI tools:https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2004-Readme.md#cli-tools

function run() {
  core.notice("Hello from my custom JavaScript Action!");

  // get some input values
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  // send request to github api
  //   github.getOctokit().
  //   github.context.

  // upload files to S3 - AWS CLI is pre-installed
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // display url
  const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
}

run();
