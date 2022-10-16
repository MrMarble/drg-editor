#!/bin/bash

# This script uploads the diff screenshots to cloudinary
# and outputs the URLs to the console. It is meant to be
# used by the CI system.


# The following environment variables must be set:
# CLOUD_NAME
# API_KEY
# API_SECRET

timestamp=$(date +%s)

#curl https://api.cloudinary.com/v1_1/dbreol5g3/image/upload -X POST -F 'file=@/path/to/sample.jpg' -F 'timestamp=173719931' -F 'api_key=436464676' -F 'signature=a781d61f86a6f818af'

if [[ -d src/__tests__/snapshots/__image_snapshots__/__diff_output__ ]]
then
  echo "Uploading diff screenshots to cloudinary"
  files=(src/__tests__/snapshots/__image_snapshots__/__diff_output__/*.png)
  i=0
  for file in "${files[@]}"
  do
    i=$((i+1))
    if [[ -f "$file" ]]
    then
      echo "Uploading $file"
      URL=$(curl https://api.cloudinary.com/v1_1/$CLOUD_NAME/image/upload -X POST -F "file=@$file" -F "timestamp=$timestamp" -F "api_key=$API_KEY"  -F "folder=test" -F "signature=$(echo -n "folder=test&timestamp=$timestamp$API_SECRET" | sha1sum | awk '{print $1}')" | jq -r '.secure_url')

      echo "diff-$i=$URL" >> $GITHUB_OUTPUT
    fi
  done
fi
