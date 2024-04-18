---
title: "TIL: Setting up systemd lingering with ansible"
excerpt: Systemd only starts up after the login of a user and then immediately gets killed again when all the sessions for that user get closed. Let's look at how to disable this with ansible.
slug: til-systemd-lingering-with-ansible
published: 2024-04-18
# lastUpdated:
tags: []
relatedPages: []
backlinks: []
---

Systemd only starts up after the login of a user and then immediately gets killed again when all the sessions for that user get closed. Let's look at how to disable this with ansible. But systemd is an important part necessary for a lot of programs and services on a Linux system. For example systemd timers won't run without it and you also can't run podman containers as they would get killed when systemd gets killed with the end of the users session.

There is a way to have systemd start for users on system boot and stay active though. You need to enable lingering for the user.

You can enable lingering for your own user by running:

```sh
loginctl enable-linger
```

Or for another user by running:

```sh
loginctl enable-linger <username>
```

But if you're trying to automate as much of your infrastructure as possible, then that's not the best solution. There sadly isn't a config file for it that you can just send to your devices to have it enabled for all the systems. If you're doing automation with ansible like I am you can achieve it like this though:

```ansible
- name: Ensure lingering enabled
  command: "loginctl enable-linger {{ item.name }}"
    creates: /var/lib/systemd/linger/{{ item.name }}
  with_items: "{{ users }}"
```

This iterates over an array of users and calls the `loginctl enable-linger <username>` for each user, unles the `/var/lib/systemd/linger/<username>` file already exists. This file automatically gets created by systemd when you enable lingering and gets deleted when you disable it. So it's a nice way to automate it.
