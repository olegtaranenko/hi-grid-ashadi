#!/bin/bash
#
#
#

# define the vesdion of the used tools
# Note these are also the foldernames in devTools
senchaCMDVersion='SenchaCmd-6.0.0.92-linux-x86'
rubyVersion='ruby-2.0.0-Linux-x86'


OS=$(uname -s)
if [ ${OS} == "Darwin" ]; then
    echo "Detected MacOS X...";
    PLATFORM="macosx"
else
    echo "No valid platform was given...defaulting to linux_x86";
    PLATFORM="linux_x86"
fi


current_dir=$PWD
#if [ ${PLATFORM} == "macosx" ]; then
#    echo "Please use for macosx system installed Sencha Cmd..."
#else
    #link the current sencha directory to the senchaCmd directory
    # this path has to be checked if sencha is not found
#    sencha_dir="$current_dir/../devTools/bin/$senchaCMDVersion"
#    general_sencha_dir="$current_dir/../devTools/bin/SenchaCmd"
    
#    echo "Check for sencha dir"
    
#    if [ ! -d $sencha_dir ]; then
#	    echo "ERROR The sencha directory does not exist $sencha_dir"
#	    return
#    fi
    
    #link the sencha dir to all known sencha
#    echo "Link Sencha"
    #check if link exist
#    if [ -d "$general_sencha_dir" ]; then
#    	rm -rf "$general_sencha_dir"
#    fi
#    ln -s "$sencha_dir" "$general_sencha_dir"
    
#    sencha_command="$general_sencha_dir/Sencha/Cmd/"

#    ruby_dir="$current_dir/../devTools/bin/$rubyVersion"

    # extract ruby
#    if [ ! -d $ruby_dir/$rubyVersion ]; then
#        cd $ruby_dir
#        unzip -o $rubyVersion.zip
#        cd $current_dir
#    fi
    #export the paths
#    export PATH="$ruby_dir/$rubyVersion/bin":$PATH
#    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ruby_dir
#fi

#export the paths
export PATH="$sencha_command":$PATH

#Uncomment these line if nedded for debugging the senchacmd version
#cd ${current_dir}/icsgui
#sencha ant .props