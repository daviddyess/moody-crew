import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import { faSteam } from '@fortawesome/free-brands-svg-icons';

library.add(
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
  faUserCircle,
  farHeart,
  faSteam
);

export default library;
