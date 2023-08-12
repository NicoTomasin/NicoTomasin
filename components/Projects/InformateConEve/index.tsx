"use client";
import Atropos from "atropos/react";
import Image from "next/image";
export default function informateConEve() {
  return (
    <Atropos className="my-atropos atropos-banner" shadowScale={1.05}>
      <Image
        src="/informateConEve/bg.png"
        data-atropos-offset="0"
        alt="informateConEve-bg"
        width={330}
        height={186}
      />
      <Image
        src="/informateConEve/himg.png"
        data-atropos-offset=""
        alt="informateConEve-hero-img"
        width={330}
        height={186}
      />
      <Image
        src="/informateConEve/nav.png"
        data-atropos-offset="5"
        alt="informateConEve-nav"
        width={330}
        height={186}
      />
      <Image
        src="/informateConEve/nav1.png"
        data-atropos-offset="6"
        alt="informateConEve-nav"
        width={330}
        height={186}
      />
      <Image
        src="/informateConEve/nav2.png"
        data-atropos-offset="8"
        alt="informateConEve-nav"
        width={330}
        height={186}
      />
      <Image
        src="/toque.png"
        data-atropos-offset="30"
        data-atropos-opacity="0.8;-10"
        alt="touch"
        width={330}
        height={186}
        className="bounce"
      />
    </Atropos>
  );
}
