export const PHOENIX_SOCKET_ENDPOINT =
  process.env.REACT_APP_PHOENIX_SOCKET_ENDPOINT;
export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
export const NODE_ENV = process.env.NODE_ENV;
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const SENTRY_KEY = process.env.REACT_APP_SENTRY_API_KEY;
export const DEFAULT_PAGE_SIZE =
  parseInt(`${process.env.REACT_APP_DEFAULT_PAGE_SIZE}`) || 15;

export const APP_NAME = 'CommonsPub';
export const INSTANCE_DESCRIPTION =
  'Federated app for open and cooperative networks.';
export const INVITE_ONLY_TEXT =
  process.env.REACT_APP_INVITE_ONLY_TEXT ||
  'Please note, signups on this instance are currently invite-only.';
export const INSTANCE_TAGLINE = 'CommonsPub - join up, federate, cooperate';
export const INSTANCE_PROMPT =
  "You don't need to sign up to preview what people are sharing and discussing publicly.";
export const prompt_signin = 'Sign in';
export const my_timeline = 'My Timeline';
export const instance_bg_img =
  'http://nycicarus.org/images/mad-solidarity-fists.png';
export const logo_large_url = 'http://commonspub.org/logo-small.png';
export const logo_small_url = 'http://commonspub.org/logo-small.png';

export const terms_markdown_text = {
  // replace the text as needed
  terms_users: 'This is a test instance. Your data is not secure or private.',
  terms_cookies: 'This site uses cookies.',
  terms_indexing:
    'Information you post on this site may be publicly available and will be copied onto other servers in the federated network.'
};

export const terms_markdown_urls = {
  // replace the URLs as needed, or enable/disable to use `terms_markdown_text` instead
  enabled: false,
  terms_users: 'https://moodle.net/terms/users.md',
  terms_cookies: 'https://moodle.net/terms/cookies.md',
  terms_indexing: 'https://moodle.net/terms/indexing.md'
};

export const related_urls = {
  // replace the URLs as needed
  project_homepage: 'https://moodle.net',
  terms_users: 'https://moodle.net/terms/users/index.html',
  terms_cookies: 'https://moodle.net/terms/cookies/index.html',
  terms_indexing: 'https://moodle.net/terms/indexing/index.html',
  code: 'https://gitlab.com/moodlenet',
  feedback: 'https://changemap.co/moodle/moodlenet/'
};

export const IS_DEV = NODE_ENV === 'development';

export const languages = {
  en_GB: 'English, British',
  en_US: 'English, USA',
  es_MX: 'Español, Méjico',
  es_ES: 'Español, España',
  fr_FR: 'Français, France',
  eu: 'Euskara',
  ar_SA: 'العربية, المملكة العربية السعودية'
};
export type LocaleKey = keyof typeof languages;
export const locales = Object.keys(languages) as LocaleKey[];

const mothershipAppId = process.env.REACT_APP_MOTHERSHIP_API_ID;
const mothershipApiKey = process.env.REACT_APP_MOTHERSHIP_API_KEY;
export const mothershipCreds =
  mothershipAppId && mothershipApiKey
    ? {
        appId: mothershipAppId,
        apiKey: mothershipApiKey
      }
    : null;
export const searchDisabled = !mothershipCreds;

export const max_file_size = '10MB';

export const accepted_file_types =
  '.pdf, .rtf, .docx, .doc, .odt, .ott, .xls, .xlsx, .ods, .ots, .csv, .ppt, .pps, .pptx, .odp, .otp, .odg, .otg, .odc, .ogg, .mp3, .flac, .m4a, .wav, .mp4, .mkv, .flv, .avi, .gif, .jpg, .jpeg, .png, .svg, .webm, .eps, .tex, .mbz';

// these licenses must match the icons (in the same order) configured in the UploadResource UI module
// please use standard identifiers from https://spdx.org/licenses/preview/ in order to preserve interoperability
export const accepted_license_types = ['CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0'];

/* log ENV if DEV */
IS_DEV &&
  console.log(`-environment-
${Object.keys(process.env)
  .map(key => `${key}=${process.env[key]}`)
  .join('\n')}
-------------
`);
/***/
