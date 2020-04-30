import React from 'react';
import { EditProfile, Props as EditProfileProps } from 'ui/pages/settings';
import { useFormik } from 'formik';
import { action } from '@storybook/addon-actions';
import Preferences from 'ui/pages/settings/preferences';
import { getActor } from './actor';
import { getActions } from './activityPreview';
import { Collection } from 'ui/modules/Previews/Collection';
import { Comment } from 'ui/modules/Previews/Comment';
import { FlaggedItem } from 'ui/modules/Previews/FlaggedItem';
import { Resource } from 'ui/modules/Previews/Resource';
import Flags from 'ui/pages/settings/flags';
import Instance from 'ui/pages/settings/instance';
import Emails from 'ui/pages/settings/invites';
import { ToggleFormik } from './formik';
import ModerationLog from 'ui/pages/settings/logs';
import { User } from 'ui/modules/Previews/User';
import {
  ActivityLoaded,
  ActivityPreview,
  Status as ActivityStatus
} from 'ui/modules/ActivityPreview';

export const getEditProfileProps = (): EditProfileProps => {
  const formik = useFormik<EditProfile>({
    initialValues: {
      image:
        'https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      location: 'Madrid',
      icon: 'https://docs.moodle.org/dev/images_dev/2/2b/estrella.jpg',
      name: 'Estrella',
      summary:
        'Spanish educator teaching at a local ESO (secondary) school, and leading a busy life!',
      website: 'https://estrella.xyz'
    },
    onSubmit: () => {
      action('submit')();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });
  return {
    formik,
    basePath: '/',
    displayUsername: '@estrella@home.moodle.net',
    isAdmin: false,
    Preferences: <Preferences />,
    Flags: <div>Flags section </div>, //FIXME
    Instance: <div>Instance section </div>, //FIXME
    Invites: <div>Invites section </div>, //FIXME,
    ModerationLog: <div>ModerationLog section </div> //FIXME,
  };
};

export const getEditProfilePropsAdmin = (): EditProfileProps => {
  const activityPreviewProps: ActivityLoaded = {
    communityLink: 'communityLink',
    communityName: 'communityName',
    event: 'Flagged a comment',
    preview: (
      <FlaggedItem
        FlaggedItemContextElement={
          <Comment
            {...getActions()}
            url="/"
            content={
              'lol we should dox Estrella here is her address: 40 Camiño Bruno, Madrid but I have not got her postal code'
            }
            isFlagged={false}
            hideActions={true}
          />
        }
        ignoreFlagFormik={useFormik({
          initialValues: {},
          onSubmit: () => {
            action('ignoreFlagFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        deleteContentFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('deleteContentFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        blockUserFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('blockUserFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        type="Comment"
        reason="Abusive speech"
      />
    ),
    status: ActivityStatus.Loaded,
    actor: getActor(),
    createdAt: '2018-11-11',
    link: 'https://picsum.photos/80/80'
  };

  const activityCollectionPreviewProps: ActivityLoaded = {
    communityLink: 'communityLink',
    communityName: 'communityName',
    event: 'Flagged a collection',
    preview: (
      <FlaggedItem
        FlaggedItemContextElement={
          <Collection
            hideActions={true}
            link={{ url: '/', external: true }}
            displayUsername={'@interesting_resources@app.moodle.net'}
            icon={
              'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80'
            }
            name={'Interesting resources ;)'}
            summary={
              'A collection of copyrighted resources for your viewing pleasure!'
            }
            totalResources={12}
            isFollowing={true}
            toggleFollowFormik={useFormik<{}>({
              initialValues: {},
              onSubmit: vals => {
                action('submitting...')();
                return new Promise(resolve =>
                  setTimeout(() => {
                    action('submitted...')();
                    resolve();
                  }, 2000)
                );
              }
            })}
          />
        }
        ignoreFlagFormik={useFormik({
          initialValues: {},
          onSubmit: () => {
            action('ignoreFlagFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        deleteContentFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('deleteContentFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        blockUserFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('blockUserFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        type="Collection"
        reason="Inappropriate Content"
      />
    ),
    status: ActivityStatus.Loaded,
    actor: getActor(),
    createdAt: '2018-11-11',
    link: 'https://picsum.photos/80/80'
  };

  const activityResourcePreviewProps: ActivityLoaded = {
    communityLink: 'communityLink',
    communityName: 'communityName',
    event: 'Flagged a resource',
    preview: (
      <FlaggedItem
        FlaggedItemContextElement={
          <Resource
            hideActions={true}
            like={{
              totalLikes: 3,
              toggleLikeFormik: useFormik<{}>({
                initialValues: {},
                onSubmit: vals => {
                  action('submitting...')();
                  return new Promise(resolve =>
                    setTimeout(() => {
                      action('submitted...')();
                      resolve();
                    }, 2000)
                  );
                }
              }),
              iLikeIt: true
            }}
            isFlagged={true}
            icon={
              'http://cutcompcosts.com/wp-content/uploads/2014/06/Student-Teacher-Violence.jpg'
            }
            name={'my teacher iz a loser'}
            summary={'mr james is rubbish and i dont lik him'}
            link={'anime.pdf'}
            license={'CC-BY-4.0'}
            acceptedLicenses={['CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0']}
            isLocal={true}
            type={'pdf'}
            FlagModal={({ done }) => {
              return <></>;
            }}
          />
        }
        ignoreFlagFormik={useFormik({
          initialValues: {},
          onSubmit: () => {
            action('ignoreFlagFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        deleteContentFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('deleteContentFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        blockUserFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('blockUserFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        type="Resource"
        reason="Inappropriate content"
      />
    ),
    status: ActivityStatus.Loaded,
    actor: getActor(),
    createdAt: '2018-11-11',
    link: 'https://picsum.photos/80/80'
  };

  const activityUserPreviewProps: ActivityLoaded = {
    communityLink: 'communityLink',
    communityName: 'communityName',
    event: 'Flagged a user',
    preview: (
      <FlaggedItem
        FlaggedItemContextElement={
          <User
            hideActions={true}
            image={
              'https://pbs.twimg.com/profile_images/1161428802091802627/O49Ggs-7_400x400.jpg'
            }
            bio={`I'm a cool user`}
            username={'@favbooks@abc.com'}
            name={'˗ˏˋ Doug Belshaw ˎˊ˗ '}
            isFollowing={true}
            profileUrl={'#'}
            toggleFollowFormik={useFormik<{}>({
              initialValues: {},
              onSubmit: vals => {
                action('submitting...')();
                return new Promise(resolve =>
                  setTimeout(() => {
                    action('submitted...')();
                    resolve();
                  }, 2000)
                );
              }
            })}
          />
        }
        blockUserFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('blockUserFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        deleteContentFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('deleteContentFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        ignoreFlagFormik={useFormik<{}>({
          initialValues: {},
          onSubmit: () => {
            action('ignoreFlagFormik')();
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 3000);
            });
          }
        })}
        type="User"
        reason="Inappropriate language"
      />
    ),
    status: ActivityStatus.Loaded,
    actor: getActor(),
    createdAt: '2018-11-11',
    link: 'https://picsum.photos/80/80'
  };

  const ActivitiesBox = (
    <React.Fragment>
      <ActivityPreview {...activityPreviewProps} />
      <ActivityPreview {...activityCollectionPreviewProps} />
      <ActivityPreview {...activityResourcePreviewProps} />
      <ActivityPreview {...activityUserPreviewProps} />
    </React.Fragment>
  );

  const formik = useFormik<EditProfile>({
    initialValues: {
      image:
        'https://images.unsplash.com/photo-1526583547718-e88dc16de312?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      location: 'Soweto, South Africa',
      icon: 'https://docs.moodle.org/dev/images_dev/4/4e/ammaarah.jpg',
      name: 'Ammaaarah',
      summary:
        'Programme Co-ordinator working at a South African university with a deep experience of Moodle and other open source software projects. ',
      website: 'https://soweto.ac.za/ammaarah'
    },
    onSubmit: () => {
      action('submit')();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });
  const formikAddDomain = useFormik<{ domain: string }>({
    initialValues: { domain: '' },
    onSubmit: ({ domain }) => {
      action(`formikAddDomain ${domain}`)();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });
  const formikRemoveDomain = useFormik<{ domain: string }>({
    initialValues: { domain: '' },
    onSubmit: ({ domain }) => {
      action(`formikRemoveDomain ${domain}`)();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });
  const formikAddEmail = useFormik<{ email: string }>({
    initialValues: { email: '' },
    onSubmit: ({ email }) => {
      action(`formikAddEmail ${email}`)();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });
  const formikRemoveEmail = useFormik<{ email: string }>({
    initialValues: { email: '' },
    onSubmit: ({ email }) => {
      action(`formikRemoveEmail ${email}`)();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });
  const formikSendInvite = useFormik<{ email: string }>({
    initialValues: { email: '' },
    onSubmit: ({ email }) => {
      action(`formikSendInvite ${email}`)();
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    }
  });

  return {
    formik,
    basePath: '/',
    displayUsername: '@ammaarah@home.moodle.net',
    Preferences: <Preferences />,
    Invites: (
      <Emails
        emailsList={[
          'about@moodle.com',
          'infomn@moodle.com',
          'test1@moodle.com',
          'test@moodle.com'
        ]}
        formikAddEmail={formikAddEmail}
        formikRemoveEmail={formikRemoveEmail}
        formikSendInvite={formikSendInvite}
        loadMoreEmails={ToggleFormik()}
      />
    ),
    Flags: <Flags FlagsBox={ActivitiesBox} loadMoreFlags={ToggleFormik()} />,
    Instance: (
      <Instance
        formikAddDomain={formikAddDomain}
        formikRemoveDomain={formikRemoveDomain}
        domainsList={['moodle.com']}
        loadMoreDomains={ToggleFormik()}
      />
    ),
    ModerationLog: <ModerationLog />,
    isAdmin: true
  };
};
