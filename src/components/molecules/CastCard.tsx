import React, { memo } from "react";
import { styled } from "@pigment-css/react";

import Avatar from "../atoms/Avatar";
import { useLinkifyBio } from "../organisms/NeynarProfileCard/hooks/useLinkifyBio";
import Box, { HBox, VBox } from "../atoms/Box";
import { WarpcastPowerBadge } from "../atoms/icons/WarpcastPowerBadge";
import { useRenderEmbeds } from "../organisms/NeynarCastCard/hooks/useRenderEmbeds";

const StyledCastCard = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "608px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.vars.palette.border,
  borderRadius: "15px",
  padding: "30px",
  color: theme.vars.palette.text,
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.fontSizes.medium,
  backgroundColor: theme.vars.palette.background,
}));

const StyledLink = styled.a(({ theme }) => ({
  textDecoration: "none",
  color: theme.vars.palette.textMuted,
}));

const Main = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flex: 1,
}));

const Username = styled.div(({ theme }) => ({
  color: theme.vars.palette.textMuted,
}));

const UsernameTitle = styled.div(({ theme }) => ({
  fontSize: theme.typography.fontSizes.large,
  fontWeight: theme.typography.fontWeights.bold,
}));

const ProfileMetaCell = styled.div(({ theme }) => ({
  color: theme.vars.palette.textMuted,
  "> strong": {
    color: theme.vars.palette.text,
  },
  "& + &": {
    marginLeft: "15px",
  },
}));

const Tag = styled.div(({ theme }) => ({
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.vars.palette.border,
  borderRadius: "5px",
  padding: "3px 6px",
  marginTop: "3px",
  marginLeft: "5px",
  backgroundColor: "transparent",
  fontSize: theme.typography.fontSizes.small,
  color: theme.vars.palette.textMuted,
  lineHeight: 1,
}));

export type CastCardProps = {
  username: string;
  displayName: string;
  avatarImgUrl: string;
  text: string;
  hash: string;
  likes: number;
  replies: number;
  embeds: any[];
  channel?: {
    id: string;
    name: string;
    url: string;
  };
  viewerFid: number;
  hasPowerBadge: boolean;
  isOwnProfile?: boolean;
  onComment?: () => void;
  onRecast?: () => void;
  onLike?: () => void;
};

export const CastCard = memo(
  ({
    username,
    displayName,
    avatarImgUrl,
    text,
    hash,
    likes,
    replies,
    embeds,
    channel,
    viewerFid,
    hasPowerBadge,
    isOwnProfile,
    onComment,
    onRecast,
    onLike,
  }: CastCardProps) => {
    const linkifiedText = useLinkifyBio(text);
    const isSingle = embeds?.length === 1;

    return (
      <StyledCastCard>
        <HBox>
          <Box spacingRight="10px">
            <Avatar
              src={avatarImgUrl}
              loading="lazy"
              alt={`${displayName} Avatar`}
            />
          </Box>
          <Main>
            <HBox justifyContent="space-between" flexGrow={1}>
              <VBox>
                <HBox>
                  <strong>{displayName}</strong>
                  {hasPowerBadge && (
                    <Box spacingLeft="5px">
                      <WarpcastPowerBadge />
                    </Box>
                  )}
                </HBox>
                <HBox alignItems="center">
                  <Username>@{username}</Username>
                </HBox>
              </VBox>
            </HBox>

            <Box spacingVertical="15px">
              <div>{linkifiedText}</div>
            </Box>
            {embeds && embeds.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                padding: isSingle ? '0' : '10px',
                border: 'none',
                borderRadius: '8px',
                width: '100%',
                margin: isSingle ? '10px 0' : '0',
              }}>
                {useRenderEmbeds(embeds, viewerFid).map((embed, index) => (
                  <div key={index}>
                    {embed}
                  </div>
                ))}
              </div>
            )}
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Box spacingVertical="15px" style={{ display: 'flex', gap: '10px' }}>
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onComment}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    d="M6.22857 12.6828H7.01285C7.01285 12.2496 6.66172 11.8985 6.22857 11.8985V12.6828ZM6.22857 15.8199H5.4443C5.4443 16.1137 5.60848 16.3828 5.8697 16.5172C6.13092 16.6517 6.44537 16.6288 6.68443 16.4581L6.22857 15.8199ZM10.6205 12.6828V11.8985C10.4571 11.8985 10.2977 11.9496 10.1647 12.0446L10.6205 12.6828ZM1.78428 3.27146C1.78428 2.54955 2.3695 1.96433 3.09141 1.96433V0.395777C1.50321 0.395777 0.215723 1.68327 0.215723 3.27146H1.78428ZM1.78428 10.5914V3.27146H0.215723V10.5914H1.78428ZM3.0914 11.8985C2.3695 11.8985 1.78428 11.3133 1.78428 10.5914H0.215723C0.215723 12.1796 1.50321 13.4671 3.0914 13.4671V11.8985ZM6.22857 11.8985H3.0914V13.4671H6.22857V11.8985ZM7.01285 15.8199V12.6828H5.4443V15.8199H7.01285ZM10.1647 12.0446L5.77272 15.1817L6.68443 16.4581L11.0764 13.321L10.1647 12.0446ZM14.5941 11.8985H10.6205V13.4671H14.5941V11.8985ZM15.9013 10.5914C15.9013 11.3133 15.316 11.8985 14.5941 11.8985V13.4671C16.1823 13.4671 17.4698 12.1796 17.4698 10.5914H15.9013ZM15.9013 3.27146V10.5914H17.4698V3.27146H15.9013ZM14.5941 1.96433C15.316 1.96433 15.9013 2.54955 15.9013 3.27146H17.4698C17.4698 1.68326 16.1823 0.395777 14.5941 0.395777V1.96433ZM3.09141 1.96433H14.5941V0.395777H3.09141V1.96433Z"
                    fill="#A0A3AD"
                  />
                </svg>
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onRecast}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    d="M14.9245 14.2506C14.7258 14.2506 14.5352 14.1716 14.3946 14.0311C14.2541 13.8905 14.1751 13.6999 14.1751 13.5011V10.5034H11.1774C10.9787 10.5034 10.7881 10.4245 10.6475 10.2839C10.507 10.1434 10.428 9.95279 10.428 9.75403C10.428 9.55527 10.507 9.36465 10.6475 9.22411C10.7881 9.08357 10.9787 9.00461 11.1774 9.00461H14.9245C15.1233 9.00461 15.3139 9.08357 15.4545 9.22411C15.595 9.36465 15.674 9.55527 15.674 9.75403V13.5011C15.674 13.6999 15.595 13.8905 15.4545 14.0311C15.3139 14.1716 15.1233 14.2506 14.9245 14.2506ZM5.18207 6.00693H1.43497C1.23621 6.00693 1.04559 5.92797 0.905047 5.78743C0.764503 5.64688 0.685547 5.45627 0.685547 5.25751V1.51041C0.685547 1.31165 0.764503 1.12103 0.905047 0.980486C1.04559 0.839943 1.23621 0.760986 1.43497 0.760986C1.63373 0.760986 1.82434 0.839943 1.96489 0.980486C2.10543 1.12103 2.18439 1.31165 2.18439 1.51041V4.50809H5.18207C5.38083 4.50809 5.57145 4.58704 5.71199 4.72759C5.85253 4.86813 5.93149 5.05875 5.93149 5.25751C5.93149 5.45627 5.85253 5.64688 5.71199 5.78743C5.57145 5.92797 5.38083 6.00693 5.18207 6.00693Z"
                    fill="#A0A3AD"
                  />
                  <path
                    d="M8.17934 15C6.33556 15.0003 4.55637 14.3209 3.18205 13.0918C1.80774 11.8627 0.934766 10.17 0.730106 8.33765C0.719281 8.23923 0.727945 8.13965 0.755606 8.04458C0.783266 7.94951 0.82938 7.86083 0.891315 7.78358C1.0164 7.62758 1.19833 7.52765 1.39709 7.50579C1.59585 7.48393 1.79515 7.54191 1.95116 7.667C2.10716 7.79208 2.20708 7.97401 2.22895 8.17277C2.37708 9.52376 2.97983 10.7843 3.93838 11.7478C4.89692 12.7113 6.15438 13.3205 7.50459 13.4755C8.85479 13.6306 10.2176 13.3223 11.3696 12.6012C12.5216 11.8801 13.3944 10.789 13.845 9.50674C13.8731 9.40817 13.9211 9.31642 13.986 9.23714C14.051 9.15787 14.1316 9.09277 14.2227 9.04586C14.3138 8.99895 14.4136 8.97123 14.5159 8.96442C14.6181 8.95761 14.7207 8.97185 14.8173 9.00625C14.9138 9.04066 15.0023 9.09451 15.0772 9.16446C15.1521 9.23442 15.2118 9.31899 15.2528 9.41296C15.2937 9.50693 15.3149 9.6083 15.3151 9.71079C15.3153 9.81329 15.2944 9.91473 15.2539 10.0089C14.7359 11.4705 13.7774 12.7355 12.5103 13.6294C11.2432 14.5233 9.73002 15.0022 8.17934 15ZM14.8792 7.50579C14.6939 7.50691 14.5148 7.43937 14.3764 7.3162C14.238 7.19302 14.1501 7.02295 14.1297 6.8388C13.975 5.49429 13.3699 4.24169 12.4128 3.28476C11.4558 2.32782 10.2031 1.72285 8.85858 1.56824C7.51405 1.41364 6.15676 1.7185 5.0075 2.43324C3.85823 3.14798 2.9846 4.23054 2.52872 5.50484C2.50062 5.6034 2.4526 5.69516 2.38763 5.77443C2.32266 5.85371 2.24212 5.91881 2.15099 5.96572C2.05987 6.01263 1.96008 6.04035 1.85781 6.04716C1.75555 6.05397 1.65297 6.03973 1.55642 6.00532C1.45988 5.97092 1.37141 5.91707 1.29651 5.84712C1.2216 5.77716 1.16183 5.69258 1.12091 5.59861C1.07999 5.50464 1.05878 5.40328 1.05859 5.30078C1.0584 5.19829 1.07923 5.09685 1.1198 5.00273C1.68406 3.40202 2.77497 2.04025 4.21397 1.14029C5.65297 0.240337 7.35485 -0.144505 9.04106 0.0487522C10.7273 0.242009 12.2979 1.00192 13.496 2.20411C14.6941 3.4063 15.4486 4.97958 15.6361 6.66644C15.6571 6.86306 15.5997 7.06004 15.4761 7.21445C15.3526 7.36887 15.173 7.4682 14.9766 7.4908L14.8792 7.50579Z"
                    fill="#A0A3AD"
                  />
                </svg>
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onLike}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    d="M13.8719 2.25042L14.2947 1.58984L13.8719 2.25042C15.2467 3.13022 15.7676 5.22206 14.8856 7.61317C14.0436 9.89583 11.9555 12.2374 8.51573 13.3648C5.07606 12.2374 2.98799 9.89584 2.14596 7.61316C1.26392 5.22203 1.7848 3.13022 3.15951 2.25042L3.15951 2.25042C4.58542 1.33783 5.64997 1.52983 6.39945 1.92503C7.21272 2.35388 7.73108 3.07114 7.86143 3.26838L8.51573 4.25838L9.17002 3.26838C9.30038 3.07113 9.81873 2.35388 10.632 1.92503C11.3815 1.52983 12.446 1.33783 13.8719 2.25042Z"
                    stroke="#A0A3AD"
                    stroke-width="1.56855"
                  />
                  <mask id="path-2-inside-1_187_1051" fill="white">
                    <path
                      d="M8.58444 13.9397C7.76139 13.6864 7.05334 13.3937 6.29976 12.9825C5.95633 12.7951 5.62285 12.5895 5.3003 12.3681C5.14416 12.2609 4.99108 12.1493 4.84063 12.0343C4.78132 11.9889 4.88038 12.0652 4.82156 12.0195C4.80388 12.0058 4.7863 11.9919 4.76869 11.9781C4.73364 11.9505 4.69884 11.9225 4.66413 11.8945C4.58948 11.8342 4.51582 11.7727 4.4428 11.7105C3.90499 11.252 3.41381 10.7389 2.98016 10.1809C3.01856 10.2303 2.97651 10.176 2.97064 10.1683C2.9583 10.1522 2.94604 10.1359 2.9338 10.1197C2.90939 10.0874 2.88527 10.0548 2.86126 10.0221C2.80961 9.95189 2.75908 9.8808 2.70932 9.8092C2.61492 9.67345 2.52441 9.535 2.4371 9.39457C2.2673 9.12145 2.11213 8.83926 1.97147 8.55006C1.93849 8.48228 1.90657 8.41396 1.87531 8.34537C1.85978 8.3113 1.84459 8.27709 1.82948 8.24284C1.82195 8.22575 1.81456 8.20864 1.80714 8.19152C1.80167 8.17889 1.76856 8.10061 1.79664 8.16736C1.73728 8.0262 1.68205 7.88329 1.63029 7.73916C1.52982 7.45942 1.44498 7.17407 1.37575 6.88502C1.34218 6.74492 1.31301 6.60379 1.28746 6.46202C1.2754 6.39502 1.2645 6.32782 1.2543 6.26052C1.24925 6.22713 1.24453 6.19369 1.23994 6.16023C1.25136 6.24358 1.23495 6.11772 1.23231 6.09532C1.20042 5.82444 1.18535 5.55158 1.18721 5.27885C1.18811 5.14691 1.19374 5.01501 1.20334 4.88343C1.20788 4.82128 1.21368 4.75922 1.22023 4.69726C1.2235 4.66651 1.22713 4.6358 1.23089 4.60511C1.23278 4.58982 1.23477 4.57457 1.23678 4.5593C1.22562 4.64425 1.23563 4.56956 1.23823 4.55163C1.27428 4.30419 1.32861 4.05943 1.40097 3.82006C1.43614 3.70375 1.47635 3.58899 1.52072 3.47587C1.53125 3.449 1.54219 3.42229 1.55326 3.39564C1.51941 3.47716 1.55889 3.38334 1.56717 3.36464C1.59226 3.30803 1.61886 3.25209 1.64643 3.19664C1.75101 2.98624 1.87476 2.78549 2.01534 2.59724C2.02371 2.58603 2.03221 2.57492 2.04071 2.5638C1.99275 2.62656 2.02446 2.58496 2.03493 2.57169C2.05223 2.54974 2.06993 2.52808 2.08773 2.50653C2.12631 2.45984 2.16629 2.41434 2.20713 2.36962C2.28587 2.28341 2.36926 2.20151 2.456 2.12339C2.49787 2.08568 2.54084 2.0492 2.58443 2.01352C2.60631 1.99561 2.62852 1.97808 2.65084 1.9607C2.58164 2.01466 2.67191 1.94557 2.68962 1.93265C2.83338 1.8277 2.98587 1.7348 3.14013 1.6463C3.54393 1.41459 3.92437 1.25567 4.3831 1.15072C4.47716 1.12921 4.57219 1.11204 4.6676 1.09771C4.74483 1.08611 4.61527 1.10399 4.69217 1.09444C4.71513 1.0916 4.73817 1.08917 4.76119 1.08677C4.81403 1.08124 4.86704 1.07739 4.92007 1.07423C5.10084 1.06348 5.28237 1.06851 5.46252 1.0864C5.48336 1.08846 5.50417 1.09092 5.52495 1.09338C5.59508 1.10167 5.46943 1.08526 5.53899 1.09521C5.57965 1.10103 5.62016 1.10795 5.66059 1.11524C5.74647 1.13073 5.83159 1.1503 5.91604 1.17227C6.0728 1.21311 6.22621 1.26621 6.37595 1.32786C6.31111 1.30115 6.41877 1.34702 6.43584 1.35477C6.46987 1.3702 6.50356 1.38639 6.53714 1.4028C6.60865 1.43779 6.67886 1.47543 6.74817 1.51462C6.87662 1.58723 7.00062 1.66753 7.12092 1.7529C7.14882 1.77271 7.17637 1.79297 7.20383 1.81338C7.21739 1.82348 7.23087 1.8337 7.24432 1.84396C7.29158 1.87992 7.1988 1.80839 7.24529 1.84482C7.30109 1.88853 7.35568 1.93375 7.40949 1.97982C7.50652 2.06288 7.59994 2.15008 7.69053 2.24011C7.84008 2.38879 7.98044 2.54677 8.11149 2.71194C8.12572 2.72987 8.17533 2.79414 8.11485 2.7157C8.12636 2.73065 8.13776 2.74568 8.1491 2.76075C8.1694 2.78769 8.18934 2.81491 8.20905 2.8423C8.23825 2.88286 8.2667 2.92398 8.29429 2.96566C8.40374 3.131 8.6286 3.131 8.73805 2.96566C8.76707 2.92181 8.79712 2.87866 8.82785 2.83598C8.84783 2.80823 8.86819 2.78075 8.88875 2.75344C8.90242 2.73529 8.94928 2.67474 8.88935 2.75214C8.90409 2.73312 8.919 2.71424 8.93399 2.69542C9.0671 2.52834 9.21071 2.36968 9.36261 2.21954C9.45411 2.12907 9.5493 2.04234 9.64732 1.95897C9.69737 1.91641 9.74847 1.87507 9.80017 1.83456C9.7388 1.88263 9.82694 1.81457 9.84213 1.80327C9.87427 1.77937 9.90683 1.75606 9.9396 1.73301C10.0608 1.64773 10.1866 1.56915 10.3159 1.49682C10.3802 1.46084 10.4457 1.42703 10.5119 1.39467C10.5455 1.37823 10.5795 1.36251 10.6136 1.34704C10.6308 1.33926 10.6481 1.33171 10.6654 1.32417C10.6915 1.31296 10.6885 1.3142 10.6564 1.3279C10.6681 1.32303 10.6798 1.31822 10.6916 1.31349C10.8423 1.25235 10.9973 1.20246 11.1548 1.16239C11.2332 1.14248 11.3123 1.12599 11.3918 1.11166C11.4323 1.10435 11.473 1.09815 11.5138 1.09231C11.4471 1.10186 11.5171 1.09226 11.5281 1.09095C11.5559 1.08767 11.5838 1.08499 11.6117 1.0824C11.793 1.06553 11.9757 1.06513 12.1573 1.0771C12.203 1.08011 12.2485 1.08444 12.294 1.08921C12.3172 1.09163 12.3402 1.0945 12.3633 1.09734C12.3036 1.08994 12.3813 1.10022 12.3881 1.10123C12.4921 1.11685 12.5952 1.13785 12.6975 1.16193C13.1586 1.27048 13.5378 1.44037 13.9464 1.67761C14.0904 1.76129 14.2314 1.8507 14.3656 1.9495C14.377 1.95791 14.3884 1.96648 14.3997 1.97503C14.4419 2.00688 14.351 1.93696 14.3926 1.96945C14.4149 1.98683 14.4369 2.00462 14.4588 2.02252C14.5059 2.06115 14.5519 2.1013 14.5971 2.14228C14.6835 2.22073 14.7656 2.30388 14.8439 2.39035C14.8815 2.43176 14.9178 2.47427 14.9534 2.51736C14.9712 2.53891 14.9887 2.56077 15.006 2.58274C15.0384 2.62388 14.9682 2.53335 15 2.575C15.0114 2.58983 15.0225 2.60479 15.0336 2.61978C15.1736 2.80871 15.2946 3.01142 15.3985 3.22224C15.4238 3.27356 15.4477 3.32553 15.4709 3.37782C15.4767 3.39096 15.4824 3.40414 15.4881 3.41734C15.5093 3.46656 15.464 3.35945 15.4845 3.40902C15.4975 3.44013 15.5099 3.47148 15.5221 3.50289C15.5661 3.61632 15.6049 3.73175 15.6398 3.84833C15.7115 4.08832 15.763 4.33416 15.7984 4.58204C15.8064 4.63806 15.7901 4.51842 15.7975 4.57463C15.7995 4.58992 15.8014 4.60521 15.8033 4.6205C15.807 4.6512 15.8104 4.68197 15.8137 4.71273C15.8208 4.77994 15.8264 4.84732 15.8312 4.91474C15.8404 5.04658 15.8447 5.17876 15.8453 5.31093C15.8464 5.58418 15.8287 5.85737 15.7961 6.12862C15.7941 6.14529 15.7919 6.16192 15.7898 6.17856C15.7822 6.23827 15.7983 6.11722 15.7901 6.17697C15.7855 6.21044 15.7806 6.24389 15.7755 6.27731C15.7644 6.35031 15.752 6.4231 15.7388 6.49573C15.7129 6.63769 15.6823 6.7788 15.6484 6.91905C15.5784 7.20843 15.4909 7.49348 15.3897 7.77343C15.3648 7.84232 15.3388 7.9108 15.3121 7.97902C15.2987 8.01338 15.2849 8.0476 15.2711 8.08179C15.2641 8.09896 15.257 8.11604 15.25 8.13315C15.2452 8.14458 15.2405 8.15598 15.2357 8.16738C15.2496 8.13453 15.251 8.13117 15.2399 8.15734C15.1786 8.30137 15.1131 8.44355 15.0443 8.58416C14.9028 8.87351 14.7451 9.15483 14.5745 9.42799C14.4868 9.56844 14.395 9.70634 14.3002 9.84213C14.254 9.90821 14.2069 9.97355 14.1592 10.0385C14.1351 10.0711 14.1108 10.1036 14.0864 10.136C14.0741 10.1522 14.0617 10.1684 14.0494 10.1845C14.0319 10.2073 14.0329 10.2061 14.0522 10.181C14.0439 10.1918 14.0355 10.2025 14.0271 10.2132C13.8135 10.4869 13.5849 10.7488 13.3445 10.9992C13.0948 11.2594 12.8309 11.5058 12.556 11.7391C12.4884 11.7965 12.4199 11.8528 12.3509 11.9086C12.3162 11.9366 12.2812 11.9643 12.2461 11.992C12.2285 12.0058 12.2108 12.0196 12.1931 12.0333C12.2377 11.9987 12.1636 12.0558 12.156 12.0616C12.005 12.1765 11.8508 12.2871 11.6942 12.3941C11.3706 12.6153 11.0348 12.8185 10.6904 13.0055C10.5122 13.1023 10.3313 13.1939 10.1484 13.2815C10.059 13.3243 9.96904 13.3658 9.87868 13.4064C9.8331 13.4269 9.78733 13.4469 9.74151 13.4669C9.7185 13.4769 9.69541 13.4868 9.67233 13.4966C9.6442 13.5086 9.64146 13.5098 9.66417 13.5002C9.64864 13.5067 9.63313 13.5132 9.61758 13.5196C9.2349 13.6788 8.84398 13.8179 8.44786 13.9398C8.31409 13.9809 8.2304 14.1178 8.26839 14.2559C8.3047 14.3878 8.45064 14.4765 8.5845 14.4353C10.1534 13.9525 11.626 13.1871 12.8857 12.131C13.9425 11.245 14.8349 10.1456 15.4543 8.91165C15.9942 7.83608 16.3357 6.64744 16.3583 5.43967C16.3774 4.41628 16.149 3.35704 15.5742 2.49789C15.2929 2.07732 14.9371 1.71816 14.5205 1.43134C13.7956 0.932295 12.9294 0.592822 12.045 0.557214C10.7717 0.505949 9.60126 1.17157 8.7697 2.09685C8.59779 2.28813 8.43634 2.49172 8.29431 2.70629C8.44223 2.70629 8.59015 2.70629 8.73807 2.70629C8.22434 1.93023 7.48255 1.25338 6.6264 0.880424C5.9305 0.577258 5.18555 0.490164 4.43721 0.617179C3.98766 0.69348 3.55546 0.856508 3.14849 1.05915C2.81945 1.22296 2.50653 1.41842 2.22115 1.65017C1.44904 2.27713 0.973026 3.20995 0.783732 4.17519C0.56509 5.29004 0.68737 6.45381 1.02051 7.53339C1.41084 8.79827 2.09407 9.95916 2.95641 10.9589C3.94757 12.1081 5.19614 13.0306 6.5582 13.6933C7.16712 13.9896 7.8008 14.2362 8.44788 14.4353C8.58174 14.4765 8.72768 14.3878 8.76399 14.2559C8.80189 14.1177 8.71821 13.9809 8.58444 13.9397Z"
                    />
                  </mask>
                  <path
                    d="M8.58444 13.9397C7.76139 13.6864 7.05334 13.3937 6.29976 12.9825C5.95633 12.7951 5.62285 12.5895 5.3003 12.3681C5.14416 12.2609 4.99108 12.1493 4.84063 12.0343C4.78132 11.9889 4.88038 12.0652 4.82156 12.0195C4.80388 12.0058 4.7863 11.9919 4.76869 11.9781C4.73364 11.9505 4.69884 11.9225 4.66413 11.8945C4.58948 11.8342 4.51582 11.7727 4.4428 11.7105C3.90499 11.252 3.41381 10.7389 2.98016 10.1809C3.01856 10.2303 2.97651 10.176 2.97064 10.1683C2.9583 10.1522 2.94604 10.1359 2.9338 10.1197C2.90939 10.0874 2.88527 10.0548 2.86126 10.0221C2.80961 9.95189 2.75908 9.8808 2.70932 9.8092C2.61492 9.67345 2.52441 9.535 2.4371 9.39457C2.2673 9.12145 2.11213 8.83926 1.97147 8.55006C1.93849 8.48228 1.90657 8.41396 1.87531 8.34537C1.85978 8.3113 1.84459 8.27709 1.82948 8.24284C1.82195 8.22575 1.81456 8.20864 1.80714 8.19152C1.80167 8.17889 1.76856 8.10061 1.79664 8.16736C1.73728 8.0262 1.68205 7.88329 1.63029 7.73916C1.52982 7.45942 1.44498 7.17407 1.37575 6.88502C1.34218 6.74492 1.31301 6.60379 1.28746 6.46202C1.2754 6.39502 1.2645 6.32782 1.2543 6.26052C1.24925 6.22713 1.24453 6.19369 1.23994 6.16023C1.25136 6.24358 1.23495 6.11772 1.23231 6.09532C1.20042 5.82444 1.18535 5.55158 1.18721 5.27885C1.18811 5.14691 1.19374 5.01501 1.20334 4.88343C1.20788 4.82128 1.21368 4.75922 1.22023 4.69726C1.2235 4.66651 1.22713 4.6358 1.23089 4.60511C1.23278 4.58982 1.23477 4.57457 1.23678 4.5593C1.22562 4.64425 1.23563 4.56956 1.23823 4.55163C1.27428 4.30419 1.32861 4.05943 1.40097 3.82006C1.43614 3.70375 1.47635 3.58899 1.52072 3.47587C1.53125 3.449 1.54219 3.42229 1.55326 3.39564C1.51941 3.47716 1.55889 3.38334 1.56717 3.36464C1.59226 3.30803 1.61886 3.25209 1.64643 3.19664C1.75101 2.98624 1.87476 2.78549 2.01534 2.59724C2.02371 2.58603 2.03221 2.57492 2.04071 2.5638C1.99275 2.62656 2.02446 2.58496 2.03493 2.57169C2.05223 2.54974 2.06993 2.52808 2.08773 2.50653C2.12631 2.45984 2.16629 2.41434 2.20713 2.36962C2.28587 2.28341 2.36926 2.20151 2.456 2.12339C2.49787 2.08568 2.54084 2.0492 2.58443 2.01352C2.60631 1.99561 2.62852 1.97808 2.65084 1.9607C2.58164 2.01466 2.67191 1.94557 2.68962 1.93265C2.83338 1.8277 2.98587 1.7348 3.14013 1.6463C3.54393 1.41459 3.92437 1.25567 4.3831 1.15072C4.47716 1.12921 4.57219 1.11204 4.6676 1.09771C4.74483 1.08611 4.61527 1.10399 4.69217 1.09444C4.71513 1.0916 4.73817 1.08917 4.76119 1.08677C4.81403 1.08124 4.86704 1.07739 4.92007 1.07423C5.10084 1.06348 5.28237 1.06851 5.46252 1.0864C5.48336 1.08846 5.50417 1.09092 5.52495 1.09338C5.59508 1.10167 5.46943 1.08526 5.53899 1.09521C5.57965 1.10103 5.62016 1.10795 5.66059 1.11524C5.74647 1.13073 5.83159 1.1503 5.91604 1.17227C6.0728 1.21311 6.22621 1.26621 6.37595 1.32786C6.31111 1.30115 6.41877 1.34702 6.43584 1.35477C6.46987 1.3702 6.50356 1.38639 6.53714 1.4028C6.60865 1.43779 6.67886 1.47543 6.74817 1.51462C6.87662 1.58723 7.00062 1.66753 7.12092 1.7529C7.14882 1.77271 7.17637 1.79297 7.20383 1.81338C7.21739 1.82348 7.23087 1.8337 7.24432 1.84396C7.29158 1.87992 7.1988 1.80839 7.24529 1.84482C7.30109 1.88853 7.35568 1.93375 7.40949 1.97982C7.50652 2.06288 7.59994 2.15008 7.69053 2.24011C7.84008 2.38879 7.98044 2.54677 8.11149 2.71194C8.12572 2.72987 8.17533 2.79414 8.11485 2.7157C8.12636 2.73065 8.13776 2.74568 8.1491 2.76075C8.1694 2.78769 8.18934 2.81491 8.20905 2.8423C8.23825 2.88286 8.2667 2.92398 8.29429 2.96566C8.40374 3.131 8.6286 3.131 8.73805 2.96566C8.76707 2.92181 8.79712 2.87866 8.82785 2.83598C8.84783 2.80823 8.86819 2.78075 8.88875 2.75344C8.90242 2.73529 8.94928 2.67474 8.88935 2.75214C8.90409 2.73312 8.919 2.71424 8.93399 2.69542C9.0671 2.52834 9.21071 2.36968 9.36261 2.21954C9.45411 2.12907 9.5493 2.04234 9.64732 1.95897C9.69737 1.91641 9.74847 1.87507 9.80017 1.83456C9.7388 1.88263 9.82694 1.81457 9.84213 1.80327C9.87427 1.77937 9.90683 1.75606 9.9396 1.73301C10.0608 1.64773 10.1866 1.56915 10.3159 1.49682C10.3802 1.46084 10.4457 1.42703 10.5119 1.39467C10.5455 1.37823 10.5795 1.36251 10.6136 1.34704C10.6308 1.33926 10.6481 1.33171 10.6654 1.32417C10.6915 1.31296 10.6885 1.3142 10.6564 1.3279C10.6681 1.32303 10.6798 1.31822 10.6916 1.31349C10.8423 1.25235 10.9973 1.20246 11.1548 1.16239C11.2332 1.14248 11.3123 1.12599 11.3918 1.11166C11.4323 1.10435 11.473 1.09815 11.5138 1.09231C11.4471 1.10186 11.5171 1.09226 11.5281 1.09095C11.5559 1.08767 11.5838 1.08499 11.6117 1.0824C11.793 1.06553 11.9757 1.06513 12.1573 1.0771C12.203 1.08011 12.2485 1.08444 12.294 1.08921C12.3172 1.09163 12.3402 1.0945 12.3633 1.09734C12.3036 1.08994 12.3813 1.10022 12.3881 1.10123C12.4921 1.11685 12.5952 1.13785 12.6975 1.16193C13.1586 1.27048 13.5378 1.44037 13.9464 1.67761C14.0904 1.76129 14.2314 1.8507 14.3656 1.9495C14.377 1.95791 14.3884 1.96648 14.3997 1.97503C14.4419 2.00688 14.351 1.93696 14.3926 1.96945C14.4149 1.98683 14.4369 2.00462 14.4588 2.02252C14.5059 2.06115 14.5519 2.1013 14.5971 2.14228C14.6835 2.22073 14.7656 2.30388 14.8439 2.39035C14.8815 2.43176 14.9178 2.47427 14.9534 2.51736C14.9712 2.53891 14.9887 2.56077 15.006 2.58274C15.0384 2.62388 14.9682 2.53335 15 2.575C15.0114 2.58983 15.0225 2.60479 15.0336 2.61978C15.1736 2.80871 15.2946 3.01142 15.3985 3.22224C15.4238 3.27356 15.4477 3.32553 15.4709 3.37782C15.4767 3.39096 15.4824 3.40414 15.4881 3.41734C15.5093 3.46656 15.464 3.35945 15.4845 3.40902C15.4975 3.44013 15.5099 3.47148 15.5221 3.50289C15.5661 3.61632 15.6049 3.73175 15.6398 3.84833C15.7115 4.08832 15.763 4.33416 15.7984 4.58204C15.8064 4.63806 15.7901 4.51842 15.7975 4.57463C15.7995 4.58992 15.8014 4.60521 15.8033 4.6205C15.807 4.6512 15.8104 4.68197 15.8137 4.71273C15.8208 4.77994 15.8264 4.84732 15.8312 4.91474C15.8404 5.04658 15.8447 5.17876 15.8453 5.31093C15.8464 5.58418 15.8287 5.85737 15.7961 6.12862C15.7941 6.14529 15.7919 6.16192 15.7898 6.17856C15.7822 6.23827 15.7983 6.11722 15.7901 6.17697C15.7855 6.21044 15.7806 6.24389 15.7755 6.27731C15.7644 6.35031 15.752 6.4231 15.7388 6.49573C15.7129 6.63769 15.6823 6.7788 15.6484 6.91905C15.5784 7.20843 15.4909 7.49348 15.3897 7.77343C15.3648 7.84232 15.3388 7.9108 15.3121 7.97902C15.2987 8.01338 15.2849 8.0476 15.2711 8.08179C15.2641 8.09896 15.257 8.11604 15.25 8.13315C15.2452 8.14458 15.2405 8.15598 15.2357 8.16738C15.2496 8.13453 15.251 8.13117 15.2399 8.15734C15.1786 8.30137 15.1131 8.44355 15.0443 8.58416C14.9028 8.87351 14.7451 9.15483 14.5745 9.42799C14.4868 9.56844 14.395 9.70634 14.3002 9.84213C14.254 9.90821 14.2069 9.97355 14.1592 10.0385C14.1351 10.0711 14.1108 10.1036 14.0864 10.136C14.0741 10.1522 14.0617 10.1684 14.0494 10.1845C14.0319 10.2073 14.0329 10.2061 14.0522 10.181C14.0439 10.1918 14.0355 10.2025 14.0271 10.2132C13.8135 10.4869 13.5849 10.7488 13.3445 10.9992C13.0948 11.2594 12.8309 11.5058 12.556 11.7391C12.4884 11.7965 12.4199 11.8528 12.3509 11.9086C12.3162 11.9366 12.2812 11.9643 12.2461 11.992C12.2285 12.0058 12.2108 12.0196 12.1931 12.0333C12.2377 11.9987 12.1636 12.0558 12.156 12.0616C12.005 12.1765 11.8508 12.2871 11.6942 12.3941C11.3706 12.6153 11.0348 12.8185 10.6904 13.0055C10.5122 13.1023 10.3313 13.1939 10.1484 13.2815C10.059 13.3243 9.96904 13.3658 9.87868 13.4064C9.8331 13.4269 9.78733 13.4469 9.74151 13.4669C9.7185 13.4769 9.69541 13.4868 9.67233 13.4966C9.6442 13.5086 9.64146 13.5098 9.66417 13.5002C9.64864 13.5067 9.63313 13.5132 9.61758 13.5196C9.2349 13.6788 8.84398 13.8179 8.44786 13.9398C8.31409 13.9809 8.2304 14.1178 8.26839 14.2559C8.3047 14.3878 8.45064 14.4765 8.5845 14.4353C10.1534 13.9525 11.626 13.1871 12.8857 12.131C13.9425 11.245 14.8349 10.1456 15.4543 8.91165C15.9942 7.83608 16.3357 6.64744 16.3583 5.43967C16.3774 4.41628 16.149 3.35704 15.5742 2.49789C15.2929 2.07732 14.9371 1.71816 14.5205 1.43134C13.7956 0.932295 12.9294 0.592822 12.045 0.557214C10.7717 0.505949 9.60126 1.17157 8.7697 2.09685C8.59779 2.28813 8.43634 2.49172 8.29431 2.70629C8.44223 2.70629 8.59015 2.70629 8.73807 2.70629C8.22434 1.93023 7.48255 1.25338 6.6264 0.880424C5.9305 0.577258 5.18555 0.490164 4.43721 0.617179C3.98766 0.69348 3.55546 0.856508 3.14849 1.05915C2.81945 1.22296 2.50653 1.41842 2.22115 1.65017C1.44904 2.27713 0.973026 3.20995 0.783732 4.17519C0.56509 5.29004 0.68737 6.45381 1.02051 7.53339C1.41084 8.79827 2.09407 9.95916 2.95641 10.9589C3.94757 12.1081 5.19614 13.0306 6.5582 13.6933C7.16712 13.9896 7.8008 14.2362 8.44788 14.4353C8.58174 14.4765 8.72768 14.3878 8.76399 14.2559C8.80189 14.1177 8.71821 13.9809 8.58444 13.9397Z"
                    stroke="#A0A3AD"
                    stroke-width="3.13711"
                    mask="url(#path-2-inside-1_187_1051)"
                  />
                </svg>
              </Box>
              <svg style={{cursor: 'pointer' }} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigator.clipboard.writeText(`https://warpcast.com/${username}/${hash.slice(0, 10)}`)}>
                <path d="M15.2003 7.49063C14.7504 7.49063 14.4504 7.79057 14.4504 8.24048V12.7396C14.4504 13.1895 14.1505 13.4894 13.7006 13.4894H3.20268C2.75277 13.4894 2.45283 13.1895 2.45283 12.7396V8.24048C2.45283 7.79057 2.15289 7.49063 1.70298 7.49063C1.25307 7.49063 0.953125 7.79057 0.953125 8.24048V12.7396C0.953125 14.0143 1.92793 14.9891 3.20268 14.9891H13.7006C14.9753 14.9891 15.9501 14.0143 15.9501 12.7396V8.24048C15.9501 7.79057 15.6502 7.49063 15.2003 7.49063ZM5.97713 4.26627L7.70178 2.54161V9.74018C7.70178 10.1901 8.00172 10.49 8.45163 10.49C8.90155 10.49 9.20149 10.1901 9.20149 9.74018V2.54161L10.9261 4.26627C11.2261 4.56621 11.676 4.56621 11.9759 4.26627C12.2759 3.96633 12.2759 3.51642 11.9759 3.21648L8.97653 0.217073C8.90155 0.142088 8.82656 0.0671031 8.75157 0.0671031C8.6016 -0.00788202 8.37665 -0.00788202 8.15169 0.0671031C8.07671 0.0671031 8.00172 0.142088 7.92674 0.217073L4.92734 3.21648C4.62739 3.51642 4.62739 3.96633 4.92734 4.26627C5.22728 4.56621 5.67719 4.56621 5.97713 4.26627Z" fill="#A0A3AD"/>
              </svg>
            </Box>
            <Box spacingVertical="15px" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div>{replies ?? 0} replies</div>
              <div>·</div>
              <div>{likes ?? 0} likes</div>
              {channel && 
                <>
                  <div>·</div>
                  <StyledLink href={`https://warpcast.com/~/channel/${channel.id}`} target="_blank">
                    /{channel.name.toLowerCase()}
                  </StyledLink>
                </>
              }
            </Box>
          </Main>
        </HBox>
      </StyledCastCard>
    );
  }
);