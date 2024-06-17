import { serve } from 'https://deno.land/std@0.110.0/http/server.ts';

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type ,Authorization, apikey',
      },
    });
  }

  const { latitude, longitude } = await req.json();

  const url = `https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=${latitude}&lon=${longitude}&appid=dj00aiZpPWJpVmdJak9EeWpiRSZzPWNvbnN1bWVyc2VjcmV0Jng9Zjg-&output=json`;

  const response = await fetch(url);
  const data = await response.json();

  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(JSON.stringify(data), {
    status: 200,
    headers,
  });
});
