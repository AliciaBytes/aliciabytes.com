---
title: "Working with git remotes"
excerpt: "How to work with git remotes, change the push URLs, migrate remote locations/git hosts, etc."
slug: working-with-git-remotes
published: true
publishedDate: 2025-09-07
lastUpdated:
tags: ["Git"]
relatedContent: []
backlinks: []
aliases: []
---

# Changing a git remote location

A lot of people are currently migrating their git repositories from one host/forge to another. I'm also in the process of slowly moving repositories where it makes the most sense. Here I'll go over some of the useful commands to work with remotes and also move the remote location.

## Listing all the remotes your repository has

A good first step whenever you work with remotes is listing your currently existing remotes:

```sh
git remote
```

The verbose listing with `-v` or `--verbose` already gives you the fetch and pull URLs for the remotes:

```sh
git remote -v
```

## Adding a remote

You can add a separate remote with the command

```sh
git remote add <name> <url>
```

For example this is often useful when you forked a repository but want to add the upstream repository as a remote to pull in changes easier and rebase on it.

```sh
git remote add upstream <url>
```

and then to rebase on the upstream with

```sh
git rebase upstream/main # or whichever remote/branch combination you want to rebase on.
```

## Deleting a remote

You can delete it again if needed with

```sh
git remote delete <name> <url>
```

## Showing the URL a remote fetches from / pushes to

To just show the URLs that are linked to a remote use

```sh
git remote get-url <remote>
```

By default this will show you the fetch URL. You can show the push URL instead witht the `--push` flag or all URLs with the `--all` flag.

```sh
git remote get-url --all <remote>
```

If both URLs are the same it will still only show up as one.

## Showing extended info about a remote

To show extended info about a remote including the url where it fetches from or pushes too, as well as tracking branch information:

```sh
git remote show <remote>
```

For example

```sh
git remote show origin
```

## Replacing the remote URL

You can set the remote url with

```sh
git remote set-url <remote> <url>
```

And optionally the `--push` option to manipulate the push URL instead of the fetch URL. **By default changing the fetch URL also changes the push URL since the push URL just reuses the fetch URL**

## Adding (multiple) URLs

By default the fetch URL is being used as a push URL. You can set a dedicated push url with

```sh
git remote set-url --add --push <remote> <url>
```

For example:

```sh
git remote set-url --add --push origin ssh://git@codeberg.org/AliciaBytes/example.git
```

You can only have a single fetch URL, but you can do this to add multiple push URLs and when you push your repository to that remote it will simultaneously push to all the remote locations.

## Deleting push URLs for a remote

You can delete wrongfully added push URLs by using the

```sh
git remote set-url --push --delete <remote> <url>
```

Which deletes `<url>` from the set of push remotes if that push URL exists.

## Low friction migration to move a repository to another location

To move a repository to a new location with the least possible friction you can at first make sure it pushes to both the current and new location at the same time with

```sh
git remote set-url --add --push origin <current_remote_url> # Add it as dedicated push URL instead of relying on empty push URLs defaulting to the fetch URL
git remote set-url --add --push origin <new_remote_url> # Add a second push URL to push to both.
```

This means that you are pushing everything to both repositories as you're working. Others may still push to the old/current remote location only, and if you don't push to the default branch or other branches (possibly because of branch protection rules) those are not pushed to the new remote location either. So you might want to make an explicit push with the default branch at some point or set up mirroring in your main repository to do that automatically.

Next step, change the fetch URL to the new remote url.

```sh
git remote set-url origin <new_remote_url>
```

At this point you're only fetching from the new remote location anymore and won't get changes from the old one anymore, so beware.

Then lastly you can stop pushing to the old remote location by deleting it's push url

```sh
git remote set-url --push --delete origin <old_remote_url>
```
