# Social App

This repository is developed by using [T3 Stack](https://create.t3.gg/)

## Requirements

To make sure all developers are using the same version, we use [Docker](https://www.docker.com). 

Make sure you've installed Docker before start developing

## How to Run 

1. Clone this repository 

    ```sh
    $ git clone https://github.com/KAT-ITB-2024/social.git
    ```

    or 

    ```sh
    git clone git@github.com:KAT-ITB-2024/social.git
    ```
2. Change the current directory to `social`

    ```sh
    cd social
    ```

3. Copy .env.example file and rename it to `.env`

4. Run the program 

    ```sh
    docker compose -f "docker-compose.dev.yml" up -d
    --build
        
    ```

## Developer's Guide 

Make sure you've read our [Developer's Guide](https://docs.google.com/document/d/1NcUUiC448Lq71QNghIzzrK--7jbi2n4CG_1_37qQfNQ/edit?usp=sharing)

**IMPORTANT NOTE**

Jangan pernah push langsung ke master / developement / staging tanpa izin kabid / wakabid / kadiv / wakadiv

**Kalo udah ke push gimana?**

Chat kabid / wakabid / kadiv / wakadiv langsung yaa