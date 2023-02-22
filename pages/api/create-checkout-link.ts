import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {customizedUnlocked, email, APIKey, contractID, imageURL, title, description} = req.body;

  if(customizedUnlocked) {
    const checkoutLink = await getCheckoutLink(email, APIKey, contractID, imageURL, title, description);
    res.status(200).json({ checkoutLink })
  } else {
    const paperTitle = "Paper Mascot"
    const paperDescription = "This NFT has hidden utility redeemable IRL at our events at ETH Denver, NFT NYC, and Art Basel."
    const checkoutLink = await getCheckoutLink(email, process.env.PAPER_API_KEY, process.env.CONTRACT_ID, process.env.IMAGE_URL, paperTitle, paperDescription);
    res.status(200).json({ checkoutLink })
  }
}

//create checkout link intent
const getCheckoutLink = async (
  email: string,
  APIKey: string,
  contractID: string,
  imageURL: string,
  title: string,
  description: string
) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + APIKey,
      },
      body: JSON.stringify({
        quantity: 1,
        metadata: {},
        expiresInMinutes: 10080,
        contractArgs: {
          tokenId: "0",
        },
        contractId: contractID,
        email: email,
        sendEmailOnCreation: true,
        requireVerifiedEmail: true,
        title: title,
        description: description,
        imageUrl: imageURL,
        twitterHandleOverride: "papercheckout",
      }),
    };

    const response = await fetch(
      "https://paper.xyz/api/2022-08-12/checkout-link-intent",
      options
    );
    console.log("yo");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    console.log(jsonResponse.checkoutLinkIntentUrl)
    return jsonResponse.checkoutLinkIntentUrl;
  } catch (e) {
    console.log("error with checkout link api", e);
  }
};