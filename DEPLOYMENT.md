# BrainyMath Deployment Checklist

## Pre-deployment Checklist

### Environment Setup

- [ ] Create `.env` file from `.env.example`
- [ ] Set `NODE_ENV=production`
- [ ] Configure `ALLOWED_ORIGINS` with your domain
- [ ] Set secure `JWT_SECRET`
- [ ] Set secure `COOKIE_SECRET`

### Data Directory

- [ ] Ensure `server/data` directory exists
- [ ] Verify all JSON files are present:
  - [ ] users.json
  - [ ] lessons.json
  - [ ] groups.json
  - [ ] forum.json

### Dependencies

- [ ] Run `npm run install-all` to install all dependencies
- [ ] Verify no dependency conflicts

### Build

- [ ] Run `npm run build` to build the client
- [ ] Verify build output in `client/build`

## Deployment Steps

1. **Server Setup**

   ```bash
   npm run install-all
   npm run build
   NODE_ENV=production npm start
   ```

2. **Environment Variables**

   - Set all required environment variables in your hosting platform
   - Ensure `NODE_ENV` is set to `production`
   - Configure `ALLOWED_ORIGINS` with your domain

3. **Data Directory**

   - Ensure the `server/data` directory is writable
   - Backup existing data if deploying to an existing server

4. **Security**

   - Verify SSL/TLS is properly configured
   - Ensure all security headers are set
   - Check rate limiting is active

5. **Monitoring**
   - Set up error logging
   - Configure performance monitoring
   - Set up uptime monitoring

## Post-deployment Checklist

- [ ] Verify all API endpoints are accessible
- [ ] Test user authentication
- [ ] Check file upload functionality
- [ ] Verify email notifications
- [ ] Test responsive design
- [ ] Check browser compatibility
- [ ] Verify SSL certificate
- [ ] Test rate limiting
- [ ] Monitor error logs
- [ ] Check performance metrics

## Rollback Plan

1. Keep the previous version's build
2. Maintain database backups
3. Document the rollback procedure:
   ```bash
   # Stop the current server
   # Restore the previous version
   # Restore data backups if needed
   # Restart the server
   ```

## Support

For deployment issues:

1. Check the error logs
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check file permissions
5. Verify network connectivity
