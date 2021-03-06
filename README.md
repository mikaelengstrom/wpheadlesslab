# Frojd-Repress

A short description of the project.

## Requirements

* Docker

## Installation


1. Setup container .env files

    ```
    cp docker/config/web.example.env docker/config/web.env
    ```

2. Include this ip on your hosts-file

    ```
    127.0.0.1 repress.dev.test
    ```

    On windows you can run this command to append it:

    ```
    echo 127.0.0.1 repress.dev.test >> c:\windows\System32\drivers\etc\hosts
    ```

3. Start project

    ```
    docker-compose up
    ```

4. Visit your site on: [http://repress.dev.test:8880](http://repress.dev.test:8880)


### Remote debugging for xdebug

If you want remote-debugging for xdebug you need to make sure some ENV-vars is available 
when docker-compose build.
You could either add them to your local environment (e.g. .zshrc) or add a .env-file in the 
project root.
```
XDEBUG_REMOTE_HOST="111.111.111.111"
XDEBUG_IDEKEY="PHPSTORM"
```

.zshrc version, supporting dynamic IP´s:
```
export XDEBUG_REMOTE_HOST=$(ifconfig | grep "inet " | grep broadcast | head -n 1 | awk '{print $2}')
export XDEBUG_IDEKEY="PHPSTORM"
```

## Git hooks

These hooks will automatically bump the application version when using `git flow release ...`

```bash
chmod 755 $PWD/git-hooks/bump-version.sh

ln -nfs $PWD/git-hooks/bump-version.sh .git/hooks/post-flow-release-start
ln -nfs $PWD/git-hooks/bump-version.sh .git/hooks/post-flow-hotfix-start
```

## Deployment

### Initial provisioning
To set up the project on a server run the provisioning. Only needed once. 

Prepare local build environment:
```bash
cd deploy
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
ansible-galaxy install -r requirements.yml
```
Run provisioning on stage or prod:
- Stage: `ansible-playbook provision.yml -i stages/stage`
- Prod: `ansible-playbook provision.yml -i stages/prod`

## Documentation

* [Bedrock docs](https://roots.io/bedrock/docs/)
* [Sage docs](https://roots.io/sage/docs/)

## License


Frojd-Repress is released under the MIT license.

