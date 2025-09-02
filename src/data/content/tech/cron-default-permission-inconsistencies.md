---
title: Cron Default Permission Inconsistencies
excerpt: In Linux even basic standard tooling that many people assume are the same across distributions, can behave differently and have inconsistencies.
slug: cron-default-permission-inconsistencies
publishedDate: 2022-10-22
tags: ["Linux"]
---

# Cron Default Permission Inconsistencies

In Linux even basic standard tooling that many people assume are the same across distributions, can behave differently and have inconsistencies. Sometimes standards like POSIX aren't detailed enough or people just plainly interpret them differently. This blog post is based on weird inconsistencies I found while studying for the LPIC-1 certificate at my vocational school.

Also for the sake of simplicity I'm focusing on Linux and using that as terminology even though I'm gonna reference some other \*nix systems.

## What is cron?

`cron` is a command line utility to schedule jobs (cron-jobs) to run common commands regularly or at fixed dates. The jobs are stored in `crontab` files and each user has their own file, as well as a system-wide `crontab` that only administrators can access. The syntax for cron is:

```cron title="cron"
* * * * * <command to execute>
│ │ │ │ │
│ │ │ │ └─── day of the week (0 = Sunday, 6 = Saturday)
│ │ │ └─── month (1 - 12)
│ │ └─── day of the month (1 - 31)
│ └─── hour (0 - 23)
└─── minute (0 - 59)
```

Only the positions with an actual value get checked. Positions with a star are not relevant for that specific job.

For example the cron declaration:

```cron title="cron"
0 0 * * * examplescript
```

would execute `examplescript` at minute 0 and hour 0, no matter the day of the month, month, or day of the week. So it gets executed at midnight every day.

The script

```cron title="cron"
* * * * 1 examplescript
```

would execute `examplescript` every Monday.

## Defining cron permissions

Defining the permissions for who can use `cron` and therefore schedule recurring jobs is regulated via 2 files, `/etc/cron.allow` and `/etc/cron.deny`. Those files contain a list of user names with 1 name per line. The rules are as following:

- The super user can always create cron jobs, no matter the other rules.
- If `/etc/cron.allow` exists, only the users listed in this file can use cron.
- If `/etc/cron.allow` doesn't exist, but `/etc/cron.deny` exists, only users **not** listed in that file can use cron.

## Default permissions

Now let's get to what this blog post is actually about, the default permissions for cron. What happens if neither `/etc/cron.allow` nor `/etc/cron.deny` exist?

### Standards perspective

Since Linux (mostly) follows the POSIX standard, let's have a look what it has to say:

> Users shall be permitted to use *crontab* if their names appear in the file `cron.allow` which is located in an implementation-defined directory. If that file does not exist, the file `cron.deny`, which is located in an implementation-defined directory, shall be checked to determine whether the user shall be denied access to *crontab*. **If neither file exists, only a process with appropriate privileges shall be allowed to submit a job.** If only `cron.deny` exists and is empty, global usage shall be permitted. The `cron.allow` and `cron.deny` files shall consist of one user name per line.
>
>See the [POSIX specification for crontab](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html) for further information

So according to a standard only a process with *appropriate privileges* should be allowed to submit a job. That leaves a lot of room for interpretation.

### Deny by default

There are a bunch of distributions that deny everyone the ability to use cron by default, with the exception of the super user who never gets restricted. Those distributions are for example:

- OpenBSD
- OpenSuse
- Fedora
- CentOS
- RHEL

Those all have relatively similar wording, but for the sake of brevity I'll limit myself to the Fedora version:

> If neither the `/etc/cron.allow` nor `/etc/cron.deny` exists, only the *root* user has access to the `cron`
>
> See the [Fedora administration guide for cron](https://fedoraproject.org/wiki/Administration_Guide_Draft/Cron) for further information

### Allow by default

Of course there are also a bunch of distributions that allow everyone to use cron by default. Now I don't personally think this follows the POSIX standard writing of *appropriate privileges*, but I guess that's up for interpretation. Those distributions are for example:

- FreeBSD
- Debian
- Ubuntu

For brevity I'll take the Debian reference here:

> If neither of these files exists, then depending on site-dependent configuration parameters, only the super user will be allowed to use this command, or all users will be able to use this command.
>
> See the [Debian manpage for crontab](https://manpages.debian.org/buster/cron/crontab.1.en.html) for further information

Now those distributions talk about *site-dependent configuration parameters*, but from personal testing it seems that the default (if you install the standard image) is that everyone can use cron by default. I couldn't easily find more information about what configuration parameters specifically were meant either.

### Other special permissions

There are also cases like Solaris where you need other special permissions, but I won't focus further on them.

## Emulating one of the default permissions

Either one of the default permissions can be emulated with the `cron.allow` and `cron.deny` files.

1. Deny by default can be easily emulated by having an empty `cron.allow` file. Only the users listed in the file, in this case no-one, can use cron. With the exception of the super user who can always use it.
2. Allow by default can be easily emulated by making sure you don't have a `cron.allow` file and making an empty `cron.deny` file. Everyone except the people listed in the deny file will be able to use cron, but since the file is empty, everyone will be allowed to use it.

## Final thoughts

This inconsistency is a bit surprising at first, but not a big deal since it's easy to emulate either of the behaviors. I still don't see how allowing everyone by default fits with the standard, but I guess it's not the only place where the standard gets slightly bent or broken. Also this whole post was brought to you by my vocational school teachers demanding that "Allow by default" was the only correct answer in a quick preparation test for the LPIC-1 exam and me being a bit stumped. You can learn a lot from wanting to figure out more about why you were wrong, sometimes even that you weren't really wrong to begin with 😉

P.S. I really need to finally start writing again, it's been way too long and I think it would be good for me. Also this post is way overdue, I've passed the LPIC-1 exam about half a year ago and the quick test from my teachers was maybe a couple months before we got to take the exams.
