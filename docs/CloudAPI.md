# Roborock Cloud A P I Specification

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

<!-- Source: test/unit/cloud_api_specification.test.ts -->
### Cloud Login Flow
The Roborock Cloud API requires a multi-step login authentication to obtain RRIOT credentials.

#### 1. Client Initialization
* **Headers**: `header_clientid` (MD5 of username + clientID), `header_appversion` ("4.XX.XX").
* **Region Discovery**: `/api/v1/getUrlByEmail` resolves the account's actual IoT base URL and country metadata before login.

#### 2. Authentication (Hawk)
Once logged in, all requests must be signed using Hawk Authentication.
* **Authorization Header**: `Hawk id="...",s="...",ts="...",nonce="...",mac="..."`
* **MAC Calculation**:
  ```text
  PRESTR = [u, s, nonce, timestamp, md5(urlPath), md5(sortedQueryParams), md5(sortedFormData)]
  MAC = HMAC-SHA256(Key=h, Data=PRESTR)
  ```
  (Where `u`, `s`, `h` come from the RRIOT login response).
* **401 Handling**: HomeData authentication failures never start an automatic re-authentication flow because code login would trigger another 2FA attempt and can hit Roborock rate limits.
