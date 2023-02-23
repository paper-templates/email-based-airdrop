# How to AirDrop NFTs Using Email
### A guide to airdropping NFTs using email. No wallet required. No crypto required.

Read the guide here: https://blog.withpaper.com/how-to-airdrop-nfts-using-email/.

Play with the live deployment here: https://email-based-airdrop.vercel.app/

![airdrop](https://user-images.githubusercontent.com/26000274/221021948-87db5360-9208-4b8f-b78e-aeb8f76a0ad1.jpg)

Airdropping NFTs have been the single best way to send NFTs to people. Airdropping doesn’t cost gas or require any crypto, but it often requires a wallet address.

In this guide, I’m going to show you how to airdrop NFTs with just an email.
No wallet required. No crypto required.

Try it yourself at email-based-airdrop.vercel.app!

Try by entering your own email in the field below and click “Send Airdrop”. A special utility NFT will airdropped to that email without needed a wallet address at all!

<img width="512" alt="Untitled (14)" src="https://user-images.githubusercontent.com/26000274/221021986-fb849d7f-1e3a-4ef4-bbbf-92dd5cf1ead7.png">
<img width="474" alt="Untitled (15)" src="https://user-images.githubusercontent.com/26000274/221021993-f3cc18d1-f65f-4dea-8396-cea7f43b38e1.png">


After airdropping yourself a NFT using email, you can customize the airdrop experience but using a NFT of your choice. All you need is your Paper API key, contract ID, and an image URL for the display!

<img width="471" alt="Untitled (16)" src="https://user-images.githubusercontent.com/26000274/221022025-7aed408b-86b7-4717-aad6-2e582c19c084.png">


* Paper API key: get your Paper API key from the Paper Developer Dashboard. You can find it in “Developer Settings”
* contract ID: your contract ID can be found in the “contracts” section. If you don’t have one, you’ll need to register a smart contract by clicking the “+” button. We recommend using thirdweb to create smart contracts with the click of a button.
* image URL: use any image of your choice :)

## Next Steps
If you want to take this airdrop project further to send a mass airdrop to multiple emails at once, you can clone the repository for email-based-airdrop.vercel.app and run a loop to call the create checkout link intent API for every email!

The project uses Paper’s Dynamic One-Time Checkout Links and passes in the email parameter with requireVerifiedEmail set to true to make sure that only the person we emailed can claim the NFT.

You can other customizations as well, check out the API page for more inspiration!

And that’s it!

If this was helpful, let me know in the discord!

-Harpriya from Paper.

---
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
