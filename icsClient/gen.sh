#!/bin/bash
#
#
#
if [ "$BUILD_TYPE" != "" ]; then
    echo "---> Build type: $BUILD_TYPE"
else
    echo "---> Build type: production"
fi

if [ "$1" == "" ]; then
    GEN_MODE="all"
else
    VENDOR=$1
    if [ "$1" == "all" ] || [ "$1" == "app" ] || [ "$1" == "theme" ]; then
        GEN_MODE=$1
        VENDOR=$2
    else
        if [ "$2" == "" ]; then
            GEN_MODE="all"
        else
            GEN_MODE="$2"
        fi
    fi
fi

if [ "$VENDOR" == "" ]; then
    VENDOR="base"
fi

if [ "$VENDOR" == "mv" ]; then
    VENDOR_DIR="ics-mv-theme"
    BUILD_VENDOR=1
elif [ "$VENDOR" == "balluff" ]; then
    VENDOR_DIR="bvs-theme"
    BUILD_VENDOR=1
else
    VENDOR_DIR="ics-base-theme"
fi

echo "---> VENDOR=$VENDOR"
echo "---> VENDOR_DIR=$VENDOR_DIR"
echo "---> GEN_MODE=$GEN_MODE"
# source the setupEnv script to setup the path for senchacmd, ruby etc
#source setupEnv.sh

#build theme
if [ "$GEN_MODE" == "theme" ] || [ "$GEN_MODE" == "all" ]; then
    echo "---> build themes..."
    pushd packages/ics-base-theme
#    sencha ant clean
    sencha package build
    popd

#    pushd packages/${VENDOR_DIR}
#    sencha ant clean
#    sencha package build
#    popd
fi

#build app
if [ "$GEN_MODE" == "app" ] || [ "$GEN_MODE" == "all" ]; then
    echo "---> build app..."
    #which sencha
    pushd icsgui
    sencha ant -Dvendor=$VENDOR $ICS_BUILD build
    popd
fi
