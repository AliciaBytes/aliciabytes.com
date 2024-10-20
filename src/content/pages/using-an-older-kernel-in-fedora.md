---
title: Using an older kernel version in Fedora
excerpt: I recently had issues with my hardware configuration since updating the linux system. Turns out it was because of issues with the new kernel version and that I had to go back a version. Here's how to do this.
slug: using-an-older-kernel-version-in-fedora
published: 2024-10-20
tags: ["Linux", "Fedora"]
aliases: []
---

I recently had issues with my hardware configuration since updating the linux system. The issues were mostly about the system not waking from sleep and also about general instability and artifacts. Turns out it was because of issues with the new kernel version and that I had to go back a version. Here's how I went about doing this.

## Figuring out the issue

When getting bigger issues after an update you should probably do some debugging first. Read logs, dmesg, etc. The way the issues manifested for me already looked like it was a bigger kernel issue kind of thing. So I skipped those steps and went straight to trying out a different kernel.

There is often a grub menu listing all the available kernel versions when booting up a linux system. Fedora hides this by default unless you are dual booting with windows. To show the menu you have to run the following shell commands

```sh
sudo grub2-editenv - unset menu_auto_hide
sudo grub2-mkconfig -o /etc/grub2-efi.cfg
```

Then you can reboot and select one of the previous versions installed. Fedora by default always leaves around 3 versions of the kernel in case of issues and having to go back. You can actually list them by running

```sh
rpm -qa kernel
```

And this behaviour can be adjusted. `/etc/dnf/dnf.conf` has a line like `installonly_limit=3` this is the limit to how many versions to keep around. Feel free to adjust it, but I'd recommend to at least always keep some old kernels around. You can also mark a specific kernel version as user installed to keep the system from removing it by running `sudo dnf mark install <kernel>` and then undoing that again when it's not needed anymore by doing `sudo dnf mark remove <kernel>`.

## Changing the default kernel version to boot

Okay, enough of a tangent. Now that you've hopefully rebooted and tried one or two older available kernel versions and found one that works for you, how do you set that one as default for boot up so that you don't have to select it each time?

This setting is managed by `/etc/default/grub`. This might look something like

```sh
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_SAVEDEFAULT=true
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="rhgb quiet"
GRUB_DISABLE_RECOVERY="true"
GRUB_ENABLE_BLSCFG=true
```

The important lines are `GRUB_DEFAULT=saved` here you can set a number `n` to automatically boot the `n`th entry in the boot menu, or you can set it to `saved` to automatically boot the saved entry or the 0th if there is none saved. The `GRUB_SAVEDEFAULT=true` line is missing by default on Fedora and actually makes it so that the system saves your last selection for the next time which makes the `saved` option work in the first place, so you need them both.

If you set your preferred working kernel version and got everything running again you can decied if you want to keep having the grub menu appear on every boot with it's timeout or if you'd prefer to skip it to boot a little faster. I decided to skip it again by running

```sh
sudo grub2-editenv - set menu_auto_hide=1
sudo grub2-mkconfig -o /etc/grub2-efi.cfg
```

I hope this helped you with your possible kernel issues as well. Also if you want further information about grub configuration you can look at https://www.gnu.org/software/grub/manual/grub/html_node/Simple-configuration.html for a start.
