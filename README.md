# Data Hub Spotlights

Contains re-designed spotlights on Uganda and Kenya, perhaps others

### Development

- Install dependencies with:

      yarn install

- Create a `.env` file and add ASSETS_SOURCE_URL, setting it to the most updated version of the DI Website. Defaults to `http://159.65.56.142/`

- Run dev environment with:

      yarn dev
### Run application with docker
- In the application's root directory run the following command to build an image:

      docker build -t <image_name> .

   replace <image_name> with any image name of choice

- Run the app container basing on the image created above using:

      docker run -p <host_port>:3000 --name <container_name> -e ASSETS_SOURCE_URL="<host_url>" <image_name>

   replace the:

               <host_port> with any port value you wish to display the application
               
               <container_name> with a container name of your choice

               <host_url> with the url of the server

               <image_name> with the name of the image you built in the previous step
                       