import * as React from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import { i18nMark, Trans } from '@lingui/react';
import styled from 'ui/themes/styled';
import { FormikHook } from 'ui/@types/types';
import {
  Sliders,
  Settings as Sett,
  MapPin,
  Link,
  Droplet,
  Mail,
  // Zap,
  Flag,
  Monitor
} from 'react-feather';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Input, Textarea } from '@rebass/forms';
import DropzoneArea from '../../../components/elements/DropzoneModal';
import { ContainerForm, Actions } from 'ui/modules/Modal';
import Button from 'ui/elements/Button';
// import { useHistory } from 'react-router';
import {
  Wrapper,
  WrapperCont,
  MainContainer,
  HomeBox
} from 'ui/elements/Layout';

const tt = {
  placeholders: {
    name: i18nMark('Choose a name for the community'),
    summary: i18nMark(
      'Please describe who might be interested in this community and what kind of collections it is likely to contain...'
    ),
    icon: i18nMark('Enter the URL of an image to represent the community'),
    location: i18nMark('Choose a location'),
    website: i18nMark('Enter a URL to share more info about you')
  }
};
export enum Status {
  Loading,
  Loaded
}

export interface SettingsLoading {
  status: Status.Loading;
}

export interface Props {
  status?: Status.Loaded;
  formik: FormikHook<EditProfile>;
  basePath: string;
  displayUsername: string;
  isAdmin: boolean;
  Preferences: JSX.Element;
  Instance: JSX.Element;
  Invites: JSX.Element;
  Flags: JSX.Element;
  ModerationLog: JSX.Element;
}

export interface EditProfile {
  name: string;
  summary: string;
  icon: string | File | undefined;
  image: string | File | undefined;
  location: string;
  website: string;
}

export interface AddEmail {
  email: string;
}

export interface EditInstance {
  inviteOnly: boolean;
}

export const Settings: React.FC<Props> = ({
  basePath,
  formik,
  Preferences,
  Instance,
  Invites,
  Flags,
  ModerationLog,
  displayUsername,
  isAdmin
}) => {
  const onIconFileSelected = React.useCallback(
    (file: File) => formik.setFieldValue('icon', file, true),
    []
  );
  const initialIconUrl =
    'string' === typeof formik.values.icon ? formik.values.icon : '';
  const onImageFileSelected = React.useCallback(
    (file: File) => formik.setFieldValue('image', file, true),
    []
  );
  const initialImageUrl =
    'string' === typeof formik.values.image ? formik.values.image : '';

  return (
    <MainContainer>
      <Sidebar basePath={basePath} isAdmin={isAdmin} />
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Box sx={{ width: '600px' }}>
              <Switch>
                <Route path={`${basePath}/preferences`}>{Preferences}</Route>
                <Route path={`${basePath}/instance`}>{Instance}</Route>
                <Route path={`${basePath}/invites`}>{Invites}</Route>
                <Route path={`${basePath}/flags`}>{Flags}</Route>
                <Route path={`${basePath}/logs`}>{ModerationLog}</Route>
                {/* <Route path={`${basePath}/accounts`}>acc</Route>
              <Route path={`${basePath}/notifications`}>notif</Route>
              <Route path={`${basePath}/admin`}>admin</Route> */}
                <Route path={`${basePath}`}>
                  <ProfileBox p={1} pb={2}>
                    <Hero>
                      <Flex>
                        <Bg>
                          <DropzoneArea
                            initialUrl={initialImageUrl}
                            filePattern="image/*"
                            onFileSelect={onImageFileSelected}
                          />
                        </Bg>
                      </Flex>
                      <FlexProfile>
                        <WrapperHero>
                          <Img>
                            <DropzoneArea
                              initialUrl={initialIconUrl}
                              filePattern="image/*"
                              onFileSelect={onIconFileSelected}
                            />
                          </Img>
                        </WrapperHero>
                      </FlexProfile>
                      <HeroInfo ml={3}>
                        <CollectionContainerForm>
                          <Input
                            placeholder={tt.placeholders.name}
                            disabled={formik.isSubmitting}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                          />
                        </CollectionContainerForm>

                        <Username mt={1} fontSize={2} p={2}>
                          {displayUsername}
                        </Username>
                        <CollectionContainerForm>
                          <Textarea
                            placeholder={tt.placeholders.summary}
                            disabled={formik.isSubmitting}
                            name="summary"
                            value={formik.values.summary}
                            onChange={formik.handleChange}
                          />
                        </CollectionContainerForm>
                        <Location mt={2}>
                          <span>
                            <MapPin strokeWidth={1} size={20} />
                          </span>
                          <CollectionContainerForm>
                            <Input
                              placeholder={tt.placeholders.location}
                              disabled={formik.isSubmitting}
                              name="location"
                              value={formik.values.location}
                              onChange={formik.handleChange}
                            />
                          </CollectionContainerForm>
                        </Location>
                        <RelevantLink mt={2}>
                          <span>
                            <Link strokeWidth={1} size={20} />
                          </span>
                          <CollectionContainerForm>
                            <Input
                              placeholder={tt.placeholders.website}
                              disabled={formik.isSubmitting}
                              name="website"
                              value={formik.values.website}
                              onChange={formik.handleChange}
                            />
                          </CollectionContainerForm>
                        </RelevantLink>
                      </HeroInfo>
                    </Hero>
                    <Actions sx={{ height: 'inherit !important' }}>
                      <Button
                        variant="primary"
                        isSubmitting={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                        type="submit"
                        style={{ marginLeft: '10px' }}
                        onClick={formik.submitForm}
                      >
                        <Trans>Save</Trans>
                      </Button>
                    </Actions>
                  </ProfileBox>
                </Route>
              </Switch>
            </Box>
          </Wrapper>
        </WrapperCont>
        <RepoLink variant="text" my={3} mt={2}>
          <a href="https://gitlab.com/moodlenet/meta/-/issues" target="_blank">
            <Trans>Want to report a bug?</Trans>
          </a>
        </RepoLink>
      </HomeBox>
    </MainContainer>
  );
};

const RepoLink = styled(Text)`
  text-align: right;
  width: 100%;
  a {
    text-decoration: underline;
    font-size: 12px;
    color: ${props => props.theme.colors.gray};
    &:hover {
      color: ${props => props.theme.colors.darkgray};
    }
  }
`;

const Sidebar = ({ basePath, isAdmin }) => {
  return (
    <WrapperPanel ml={0} mr={2}>
      <Panel>
        <Nav>
          <NavItem p={3} fontSize={1}>
            <NavLink exact to={`${basePath}/`}>
              <Flex
                alignItems="center"
                sx={{ textTransform: 'capitalize', fontSize: '14px' }}
              >
                <Icon className="icon" mr={1}>
                  <Sett size={20} />
                </Icon>
                General information
              </Flex>
            </NavLink>
          </NavItem>
          <NavItem p={3} fontSize={1}>
            <NavLink to={`${basePath}/preferences`}>
              <Flex
                alignItems="center"
                sx={{ textTransform: 'capitalize', fontSize: '14px' }}
              >
                <Icon className="icon" mr={1}>
                  <Sliders size={20} />
                </Icon>
                Preferences
              </Flex>
            </NavLink>
          </NavItem>
          {isAdmin ? (
            <>
              <SectionTitle p={3} fontSize="1">
                <Flex
                  alignItems="center"
                  p={3}
                  sx={{ textTransform: 'capitalize', fontSize: '14px' }}
                >
                  {/* <Icon className="icon" mr={1}>
                <Key size={20} />
              </Icon> */}
                  <Text variant="suptitle">Admin</Text>
                </Flex>
              </SectionTitle>
              <NavItem p={3} fontSize={1}>
                <NavLink to={`${basePath}/instance`}>
                  <Flex
                    alignItems="center"
                    sx={{ textTransform: 'capitalize', fontSize: '14px' }}
                  >
                    <Icon className="icon" mr={1}>
                      <Droplet size={20} />
                    </Icon>
                    Instance
                  </Flex>
                </NavLink>
              </NavItem>
              <NavItem p={3} fontSize={1}>
                <NavLink to={`${basePath}/invites`}>
                  <Flex
                    alignItems="center"
                    sx={{ textTransform: 'capitalize', fontSize: '14px' }}
                  >
                    <Icon className="icon" mr={1}>
                      <Mail size={20} />
                    </Icon>
                    Invites
                  </Flex>
                </NavLink>
              </NavItem>
              <NavItem p={3} fontSize={1}>
                {/* <NavLink to={`${basePath}/reports`}> */}
                <NavLink to={`${basePath}/flags`}>
                  <Flex
                    alignItems="center"
                    sx={{ textTransform: 'capitalize', fontSize: '14px' }}
                  >
                    <Icon className="icon" mr={1}>
                      <Flag size={20} />
                    </Icon>
                    Flags
                  </Flex>
                </NavLink>
              </NavItem>
              <NavItem p={3} fontSize={1}>
                <NavLink to={`${basePath}/logs`}>
                  <Flex
                    alignItems="center"
                    sx={{ textTransform: 'capitalize', fontSize: '14px' }}
                  >
                    <Icon className="icon" mr={1}>
                      <Monitor size={20} />
                    </Icon>
                    Moderation log
                  </Flex>
                </NavLink>
              </NavItem>
            </>
          ) : null}

          {/* <NavItem p={3} fontSize={1}>
          <NavLink to={`${basePath}/accounts`}>
          <Flex alignItems="center" sx={{textTransform: "capitalize", fontSize: "14px"}}>
                    <Icon className="icon" mr={1}><User size={20} /></Icon>Account
                </Flex>
          </NavLink>
        </NavItem>
        <NavItem p={3} fontSize={1}>
        <NavLink to={`${basePath}/notifications`}>
        <Flex alignItems="center" sx={{textTransform: "capitalize", fontSize: "14px"}}>
                    <Icon className="icon" mr={1}><Bell size={20} /></Icon>Notifications
                </Flex>
        </NavLink>
        </NavItem>
        <NavItem p={3} fontSize={1}>
          <NavLink to={`${basePath}/admin`}>
          <Flex alignItems="center" sx={{textTransform: "capitalize", fontSize: "14px"}}>
                    <Icon className="icon" mr={1}><Zap size={20} /></Icon>Admin
                </Flex>
          </NavLink>
        </NavItem> */}
        </Nav>
      </Panel>
    </WrapperPanel>
  );
};

const SectionTitle = styled(Flex)`
  border-top: 4px solid ${props => props.theme.colors.lighter};
  border-bottom: 1px solid ${props => props.theme.colors.lighter};
`;

const CollectionContainerForm = styled(ContainerForm)`
  input {
    background: #fbfbfb;
    color: ${props => props.theme.colors.darkgray};
    border: 0;
    font-weight: 700;
  }

  textarea {
    background: #fbfbfb;
    border-radius: 2px;
    border: 0;
    height: 120px;
    resize: none;
  }
`;

const Img = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 6px;
  background: ${props => props.theme.colors.lightgray};
  border: 3px solid white;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  margin-right: 16px;
`;

const Bg = styled(Box)`
  height: 250px;
  border-radius: 4px;
  width: 100%;
  display: inline-block;
  .thumb {
    height: 100%;
  }
`;
const FlexProfile = styled(Flex)`
  justify-content: space-between;
  ${media.lessThan('860px')`
  flex-direction: column;
  align-items: center;
  text-align: center;
`};
`;

const ProfileBox = styled(Box)``;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  font-size: 14px;
`;

const Location = styled(Flex)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  line-height: 26px;
  font-size: 14px;
  border-radius: 100px;
  align-items: center;
  span {
    margin-right: 8px;
    & svg {
      stroke: ${props => props.theme.colors.gray};
      vertical-align: text-bottom;
    }
    .--rtl & {
      margin-left: 8px;
      margin-right: 0px;
    }
  }
`;

const RelevantLink = styled(Flex)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  line-height: 26px;
  font-size: 14px;
  border-radius: 100px;
  align-items: center;
  span {
    margin-right: 8px;
    & svg {
      stroke: ${props => props.theme.colors.gray};
      vertical-align: text-bottom;
    }
    .--rtl & {
      margin-left: 8px;
      margin-right: 0px;
    }
  }
`;

const WrapperHero = styled.div`
  padding: 24px;
  padding-top: 0;
  z-index: 9999;
  position: relative;
  margin-top: -60px;
  padding-bottom: 0;
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
  border-radius: 6px;
  & p {
    color: ${props => props.theme.colors.darkgray};
    padding: 0 24px;
    margin-left: 120px;
    margin: 0;
    margin-left: 136px;
    margin-top: -40px;
    line-height: 26px;
    font-size: 16px;
    padding-bottom: 16px;
  }
`;

const HeroInfo = styled(Box)`
  & button {
    span {
      vertical-align: sub;
      display: inline-block;
      height: 30px;
      margin-right: 4px;
    }
  }
`;

const Icon = styled(Box)`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  svg {
    stroke: ${props => props.theme.colors.gray};
    width: 40px;
  }
`;

export const WrapperPanel = styled(Flex)`
  width: 350px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  font-family: ${props => props.theme.fontFamily};
  &.extra {
    width: 100%;
  }
  ${media.lessThan('1095px')`
  width: 290px;
`};
  ${media.lessThan('1005px')`
   display: none;
  `};
`;

export const Panel = styled(Box)`
  background: #fff;
  border-radius: 4px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-bottom: 8px !important;
`;

export const PanelTitle = styled(Text)`
  text-transform: uppercase;
  border-bottom: 4px solid ${props => props.theme.colors.lighter};
  padding: 16px;
`;

export const Nav = styled(Box)``;

export const NavItem = styled(Text)`
color: ${props => props.theme.colors.darkgray}
border-bottom: 1px solid ${props => props.theme.colors.lighter};
a {
  color: ${props => props.theme.colors.darkgray}
  text-decoration: none;
  font-weight: 700;
  &.active {
      color: ${props => props.theme.colors.primary};
    .icon {
        background: ${props => props.theme.colors.lighter};
        svg {
          stroke: ${props => props.theme.colors.primary};
        }
    }
    
  }
}
&:hover {
    .icon {
        background: ${props => props.theme.colors.lighter};
        svg {
          stroke: ${props => props.theme.colors.primary};
        }
    }
  }
  `;
