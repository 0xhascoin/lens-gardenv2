import { createClient } from "urql";

const API_URL = "https://api.lens.dev"
export const client = createClient({
    url: API_URL
});

export const myStats = `
query Profiles (
    $address: EthereumAddress!
  ){
    profiles(request: { ownedBy: [$address] }) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      } 
    }
  }
`


export const getLensProfile_Header = `
query Profiles (
    $address: EthereumAddress!
  ){
    profiles(request: { ownedBy: [$address] }) {
      items {

        picture {
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
        }
        handle
        ownedBy
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
      }
    }
  }
`