require 'compass/import-once/activate'
# Require additional compass plugins here
require 'aleksi'

# Extension Paths
extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
stylesheets_path = File.join(extension_path, 'stylesheets')

# Register Extension
if (defined? Compass)
    # Register as a Compass extension
    Compass::Frameworks.register('lilo', :path => extension_path)
else
    # Compass not found, register on the Sass path via the environment.
    if ENV.has_key?("SASS_PATH")
        ENV["SASS_PATH"] = ENV["SASS_PATH"] + File::PATH_SEPARATOR + stylesheets_path
    else
        ENV["SASS_PATH"] = stylesheets_path
    end
end

# Version is a number. If a version contains alphas, it will be created as a prerelease version
# Date is in the form of YYYY-MM-DD
module Lilo
    VERSION = "0.2.1"
    DATE = "2017-03-02"
end