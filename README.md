# LanA

## How to add a new page
Navigation bar is defined at `./components/Navigation.jsx` file. In order to add 
a new page to navbar you must define a new page inside `./pages` and add route 
at `routes.js` file. Also do not forget to export page by updating `./pages/index.jsx`.

## How to build and push image to DockerHub

```bash
yarn build
docker build --tag <your-username>/evlabwebapps-langatlas:latest .
docker push <your-username>/evlabwebapps-langatlas:latest
```
OR edit and run `build_push.sh` script.

## How to deploy on the server (same as for backend)
You need to enter Vagrant VM, pull Docker images and recreate containers with updated images.

On HPC:
```bash
cd /om2/user/amirov/vagrant_images/evlabwebapps/
vagrant ssh
```
Inside VM:
```bash
docker-compose pull
docker-compose up -d
```

Docker-compose on VM that is common for frontend and backend
```yaml
version: '3.5'

services:

  admin:
    image: aamirov/evlab-web-apps-admin:latest
    build: .
    env_file: '.env'
    volumes:
      - './assets:/app/assets'
      - './backend-data:/app/data'
    ports:
      - 8000:8000
    networks:
      - backend

  redis:
    image: redis:5-alpine
    networks:
      - backend

  celery:
    image: aamirov/evlab-web-apps-admin:latest
    build: .
    env_file: '.env'
    volumes:
      - './assets:/app/assets'
      - './backend-data:/app/data'
    networks:
      - backend
    command: celery -A src.evlabwebapps worker -l INFO

  celery-beat:
    image: aamirov/evlab-web-apps-admin:latest
    build: .
    env_file: '.env'
    networks:
      - backend
    command: celery -A src.evlabwebapps beat -l INFO

  frontend:
    image: aamirov/evlabwebapps-langatlas:latest
    ports:
      - 8760:8760

networks:
  backend:
    name: evlabwebapps
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
