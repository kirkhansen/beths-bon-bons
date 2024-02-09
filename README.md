# Development

## First install

This uses [hugo](https://gohugo.io/installation/linux/) to create the web app.
Refer to the installation instructuctions to get going: something like `sudo apt install hugo` will get you going.

This makes use of a hugo theme as a submodule. We'll need to pull this in after cloning

```bash
git submodule update --init --recursive
```


## Start development server

hugo server

## Deploy

This uses github actions to deploy to the app to firebase. Merging into the main branch should trigger a new deployment.