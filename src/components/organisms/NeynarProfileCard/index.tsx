import React, { useState, useEffect, useCallback } from "react";

import { ProfileCard } from "../../molecules/ProfileCard";
import { NEYNAR_API_URL } from "../../../constants";
import { useNeynarContext } from "../../../contexts";
import customFetch from "../../../utils/fetcher";

async function fetchUserByFid({
  fid,
  viewerFid,
  clientId,
}: {
  fid: number;
  viewerFid?: number;
  clientId: string;
}): Promise<any | null> {
  try {
    let url = `${NEYNAR_API_URL}/v2/farcaster/user/bulk?client_id=${clientId}&fids=${fid}`;

    if (viewerFid) {
      url += `&viewer_fid=${viewerFid}`;
    }

    const response = await customFetch(url);
    const data = await response.json();
    return data?.users?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching user by fid", error);
    return null;
  }
}

export type NeynarProfileCardProps = {
  fid: number;
  viewerFid?: number;
  showItems?: {
    bio?: boolean;
    stats?: boolean | "followers" | "following";
    powerBadge?: boolean;
    avatar?: boolean;
  }
  containerStyles?: React.CSSProperties;
};

export const NeynarProfileCard: React.FC<NeynarProfileCardProps> = ({
  fid,
  viewerFid,
  showItems = { bio: true, stats: true, powerBadge: true, avatar: true },
  containerStyles
}: NeynarProfileCardProps) => {
  const { client_id } = useNeynarContext();

  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isOwnProfile = userData?.fid === viewerFid;

  useEffect(() => {
    if (fid) {
      setLoading(true);
      setError(null);

      fetchUserByFid({ fid, viewerFid, clientId: client_id })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [fid, viewerFid]);

  const handleCast = useCallback(() => {
    // TODO: Handle cast
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData || error) {
    return <div>Error fetching user data</div>;
  }

  return (
    <ProfileCard
      fid={fid}
      username={userData.username}
      displayName={userData.display_name}
      avatarImgUrl={userData.pfp_url}
      bio={showItems.bio ? userData.profile.bio.text : undefined}
      followers={showItems.stats === "followers" ? userData.follower_count : undefined}
      following={showItems.stats === "following" ? userData.following_count : undefined}
      hasPowerBadge={showItems.powerBadge ? userData.power_badge : undefined}
      isOwnProfile={isOwnProfile}
      isFollowing={userData.viewer_context?.followed_by}
      onCast={handleCast}
      containerStyles={containerStyles}
    />
  );
};
