# Vercel Deployment Instructions

## Environment Variables Required

Set these environment variables in your Vercel dashboard:

1. **MONGO_URI**: Your MongoDB connection string
   ```
   mongodb+srv://username:password@cluster.mongodb.net/defiexplorer
   ```

2. **FRONTEND_URL**: Your frontend domain (for CORS)
   ```
   https://your-frontend-domain.vercel.app
   ```

3. **JWT_SECRET**: Secret key for JWT tokens
   ```
   your-super-secret-jwt-key
   ```

4. **NODE_ENV**: Set to production
   ```
   production
   ```

## Deployment Steps

1. **Connect your GitHub repository to Vercel**
2. **Set the environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically detect the Node.js app
4. **Update your frontend** to use the new backend URL

## API Endpoints

Your API will be available at:
- `https://your-backend-domain.vercel.app/api/chains`
- `https://your-backend-domain.vercel.app/api/dapps`
- `https://your-backend-domain.vercel.app/api/admin`
- etc.

## Troubleshooting

- Make sure MongoDB Atlas is configured to allow connections from anywhere (0.0.0.0/0)
- Check Vercel logs for any connection errors
- Ensure all environment variables are set correctly 