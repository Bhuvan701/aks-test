# ---------- 1. Build Stage ----------
FROM node:latest AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

ENV AZURE_AD_CLIENT_ID=dummy
ENV AZURE_AD_CLIENT_SECRET=dummy
ENV AZURE_AD_TENANT_ID=dummy
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=dummy

# Build Next.js app
RUN npm run build

# ---------- 2. Production Stage ----------
FROM node:latest AS runner

WORKDIR /app

ENV NODE_ENV=production

# Only copy required files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]