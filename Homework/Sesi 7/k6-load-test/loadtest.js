import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, ENDPOINT, DEFAULT_HEADERS } from './endpoint.js';
import { generateReport } from './htmlReport.js';

export let options = {
  vus: 10,
  duration: '10s',
};

export default function () {

  // POST LOGIN
  const loginPayload = JSON.stringify({
    username: 'admin',
    password: 'admin',
  });

  const loginRes = http.post(
    `${BASE_URL}${ENDPOINT.LOGIN}`,
    loginPayload,
    { headers: DEFAULT_HEADERS }
  );

  check(loginRes, {
    'Login status 200': (r) => r.status === 200,
    'Login response time < 1 detik': (r) => r.timings.duration < 1000,
  });

  const token = loginRes.json().token;

  // GET USERS
  const usersRes = http.get(
    `${BASE_URL}${ENDPOINT.USERS}`,
    {
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  check(usersRes, {
    'Get users status 200': (r) => r.status === 200,
    'Get users response time < 1 detik': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}

// AUTO GENERATE HTML
export function handleSummary(data) {
  return generateReport(data);
}
