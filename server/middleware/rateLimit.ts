import {defineEventHandler, createError, getRequestHeaders} from 'h3';

const config = useRuntimeConfig();
const requestCounts = new Map<string, { count: number; lastRequest: number }>();

export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event);
  const ip = headers['x-forwarded-for'] || event.node.req.socket.remoteAddress;

  if (!ip) return;

  const currentTime = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, {count: 1, lastRequest: currentTime});

    return;
  }

  const requestData = requestCounts.get(ip)!;
  const timeSinceLastRequest = currentTime - requestData.lastRequest;

  if (timeSinceLastRequest < config.rateLimit.perTime) {
    if (requestData.count >= config.rateLimit.maxRequests) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too Many Requests',
        message: 'Вы превысили лимит запросов. Попробуйте снова позже.',
      });
    }

    requestData.count++;
  } else {
    requestCounts.set(ip, {count: 1, lastRequest: currentTime});
  }
});
