FROM node:22-alpine
WORKDIR /app
COPY suwenku/package.json ./
COPY suwenku/api ./api
RUN mkdir -p /app/api/data
ENV NODE_ENV=production PORT=8787 HOST=0.0.0.0 DATA_DIR=/app/api/data
EXPOSE 8787
CMD ["node", "api/server.mjs"]
