import { library } from '@fortawesome/fontawesome-svg-core';
// Use the imports and library.add() below to add icons
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import { faSteam } from '@fortawesome/free-brands-svg-icons';

library.add(faUserCircle, farHeart, faSteam);

export default library;
