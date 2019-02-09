import React from 'react';

import styles from './setAvatarExample.scss';
import { withViewModelInjection } from '../../../../libs/mobx/withViewModel';
import { SetAvatarExampleViewModel } from './setAvatarExampleViewModel';
import { AvatarLoader } from '../../avatar/loader/avatarLoader';
import { SelectionContainer } from '../../selection/container/selectionContainer';
import { CropSelection } from '../../selection/crop/cropSelection';
import { BaseButton } from '../../base/button/baseButton';


const setAvatarExampleHOC = withViewModelInjection(SetAvatarExampleViewModel);

export const SetAvatarExample = setAvatarExampleHOC(
    /**
     * @param {SetAvatarExampleViewModel} viewModel
     */
    ({
        viewModel,
    }) => {
        return <div className={ styles.root }>
            <AvatarLoader className={ styles.avatarLoader }
                          imgSrc={ viewModel.imgSrc }
                          imgRef={ viewModel.imgRef }
                          onImageChange={ viewModel.onImageChange }
                          onImageLoad={ viewModel.onImageLoad }
                          onImageSizeChange={ viewModel.onImageSizeChange }
                          imageElements={ viewModel.showCrop
                              ? <SelectionContainer inParentOnly={ true }
                                                    minWidth={ viewModel.minAvatarSize }
                                                    minHeight={ viewModel.minAvatarSize }
                                                    isSquareMode={ true }
                                                    parentSize={ viewModel.imageSize }
                                                    onChange={ viewModel.onSelectionChange }
                                                    initialBounds={ viewModel.initialCropBounds } >
                                  <CropSelection />
                              </SelectionContainer>
                              : null
                          } />

            <If condition={ viewModel.showCrop }>
                <div className={ styles.buttonContainer }>
                    <BaseButton onClick={ viewModel.onCrop }>
                        Crop!
                    </BaseButton>
                </div>
            </If>
        </div>
    }
);

