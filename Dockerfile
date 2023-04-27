FROM docker.io/node:18.15-alpine AS deps

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

FROM docker.io/node:18.15-alpine AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM docker.io/node:18.15-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/pages ./src/pages

USER nextjs

EXPOSE 8080

ENV NEXT_TELEMETRY_DISABLED 1

CMD yarn start -p 8080