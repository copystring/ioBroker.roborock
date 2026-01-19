# Roborock Cloud A P I Specification

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

<!-- Source: test/unit/cloud_api_specification.test.ts -->
### Cloud Login Flow
The Roborock Cloud API requires a multi-step login authentication to obtain RRIOT credentials.

#### 1. Client Initialization
* **Headers**: `header_clientid` (MD5 of username + clientID), `header_appversion` ("4.XX.XX").
* **Region**: Base URL must match the user's region (`euiot`, `usiot`, `cniot`, `api`).

#### 2. Authentication (Hawk)
Once logged in, all requests must be signed using Hawk Authentication.
* **Authorization Header**: `Hawk id="...", s="...", ts="...", nonce="...", mac="..."`
* **MAC Calculation**:
  ```text
  PRESTR = [u, s, nonce, timestamp, md5(urlPath), "", ""]
  MAC = HMAC-SHA256(Key=h, Data=PRESTR)
  ```
  (Where `u`, `s`, `h` come from the RRIOT login response).