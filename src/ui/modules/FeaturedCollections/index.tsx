import { Trans } from '@lingui/macro';
import React, { useRef, SFC, ComponentType } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'ui/themes/styled';
import CollectionSmall, { CollectionBase } from './preview';
import { ChevronLeft, Right } from 'ui/Icons';
import { Box, Flex } from 'rebass';
import Button from 'ui/elements/Button';
import Modal from 'ui/modules/Modal';

export const Title = styled(Flex)`
  font-size: 15px;
  font-weight: 700;
  padding: 8px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  margin: 0;
  color: ${props => props.theme.colors.darkgray};
  & h5 {
    margin: 0;
    color: ${props => props.theme.colors.darkgray};
    display: inline-block;
    flex: 1;
    padding: 0;
    font-size: 12px;
    text-transform: uppercase;
    height: 30px;
    font-weight: 500;
    line-height: 30px;
  }
`;

export const RightContext = styled(Flex)`
  & span {
    cursor: pointer;
    display: inline-block;
    height: 30px;
    & svg {
      color: ${props => props.theme.colors.darkgray} !important;
      vertical-align: middle;
      height: 30px;
    }
    &:hover {
      & svg {
        color: ${props => props.theme.colors.darkgray} !important;
      }
    }
  }
  float: right;
`;

const ActionContainer = styled(Flex)`
  justify-content: right;
  align-items: center;
`;

const ActionItem = styled(Flex)`
  display: inline-flex;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  padding-right: 10px;
  button {
    height: 30px;
    line-height: 10px;
  }
  &:hover {
    svg.hover {
      stroke: ${props => props.theme.colors.orange};
    }
  }
`;

export interface FeaturedCollectionsData {
  isAdmin: boolean;
  featuredCollections: CollectionBase[];
  FeaturedModal: ComponentType<{ collection: CollectionBase; done(): any }>;
}

export const FeaturedCollections: SFC<FeaturedCollectionsData> = props => {
  const sliderRef = useRef<Slider>();
  const [isEditing, setEditing] = React.useState(false);
  const [
    selectedCollectionForModal,
    setSelectedCollectionForModal
  ] = React.useState<null | CollectionBase>(null);
  // const { RTL } = useContext(LocaleContext);
  //   if (props.status === Status.Loading) {
  //     return <Trans>loading...</Trans>;
  //   }
  return (
    <>
      <Title>
        <h5>
          <Trans>Featured collections</Trans>{' '}
        </h5>

        <RightContext>
          {props.isAdmin ? (
            <ActionContainer>
              <ActionItem onClick={() => setEditing(!isEditing)}>
                {!isEditing ? (
                  <Button variant={'outline'}>
                    <Trans>Edit</Trans>
                  </Button>
                ) : (
                  <Button variant={'outline'}>
                    <Trans>Done</Trans>
                  </Button>
                )}
              </ActionItem>
            </ActionContainer>
          ) : null}
          <span onClick={sliderRef.current && sliderRef.current.slickPrev}>
            <ChevronLeft
              width={26}
              height={26}
              strokeWidth={1}
              color={'#333'}
            />
          </span>
          <span onClick={sliderRef.current && sliderRef.current.slickNext}>
            <Right width={26} height={26} strokeWidth={1} color={'#333'} />
          </span>
        </RightContext>
      </Title>
      <Box px={2}>
        <Slider
          ref={c => (sliderRef.current = c || undefined)}
          {...sliderSettings}
        >
          {props.featuredCollections.map(collection => (
            <div key={collection.id}>
              <CollectionSmall
                collection={collection}
                isAdmin={props.isAdmin}
                isEditing={isEditing}
                remove={() => setSelectedCollectionForModal(collection)}
              />
            </div>
          ))}
        </Slider>
      </Box>
      {selectedCollectionForModal && props.isAdmin && (
        <Modal closeModal={() => setSelectedCollectionForModal(null)}>
          <props.FeaturedModal
            collection={selectedCollectionForModal}
            done={() => setSelectedCollectionForModal(null)}
          />
        </Modal>
      )}
    </>
  );
};

export default FeaturedCollections;

const sliderSettings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
