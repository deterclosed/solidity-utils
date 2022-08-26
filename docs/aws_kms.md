---
id: aws_kms
title: AWSKMS
---

# AWS KMS Configuration

Create an asymetric key with usage as "sign and verify" in your AWS account.
Note: Support for "ECC_SECG_P256K1" spec is not there yet.

Search for IAM and create a user with "Programmatic access" for Signatory to access the key resources. Save the details at the end which will be given only once on creation of the user.

## AWS KMS backend

Below are the minimum configuration required.

```sh
awskms:
    driver: awskms
    config:
      user_name: sigy-tsty
      access_key_id: AKIATXBC6RIH4YZT5U6B
      secret_access_key: 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
      region: us-west-2
```

### Configuration parameters

Name | Type | Required | Description
-----|------|:--------:|------------
user_name | string |✅| IAM user name
access_key_id | string | OPTIONAL | IAM user detail
secret_access_key | string | OPTIONAL | IAM user detail
region | string | ✅ | Region where key is created

The fields `access_key_id` & `secret_access_key` can be set in the environment variables `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` respectively.