cmake_minimum_required(VERSION 3.18)

project(roborock_hermes_appplugin_host LANGUAGES C CXX)

set(HERMES_SOURCE_DIR "" CACHE PATH "Path to the pinned Meta Hermes source tree")
if(NOT HERMES_SOURCE_DIR OR NOT EXISTS "${HERMES_SOURCE_DIR}/CMakeLists.txt")
	message(FATAL_ERROR "Set HERMES_SOURCE_DIR to a complete Meta Hermes source tree")
endif()

set(HERMESC_EXECUTABLE "" CACHE FILEPATH "Optional matching host hermesc executable")
if(HERMESC_EXECUTABLE)
	file(TO_CMAKE_PATH "${HERMESC_EXECUTABLE}" HERMESC_EXECUTABLE_CMAKE)
	set(HERMESC_IMPORT_FILE "${CMAKE_BINARY_DIR}/ImportHermesc.cmake")
	file(WRITE "${HERMESC_IMPORT_FILE}"
		"add_executable(native-hermesc IMPORTED GLOBAL)\n"
		"set_target_properties(native-hermesc PROPERTIES IMPORTED_LOCATION \"${HERMESC_EXECUTABLE_CMAKE}\")\n"
	)
	set(IMPORT_HERMESC "${HERMESC_IMPORT_FILE}" CACHE FILEPATH "" FORCE)
endif()

# Phase 0 needs the embeddable VM and a matching hermesc. A supplied compiler
# avoids building the other tools; tests, debugger and Intl remain disabled.
if(HERMESC_EXECUTABLE)
	set(HERMES_ENABLE_TOOLS OFF CACHE BOOL "" FORCE)
else()
	set(HERMES_ENABLE_TOOLS ON CACHE BOOL "" FORCE)
endif()
set(HERMES_ENABLE_TEST_SUITE OFF CACHE BOOL "" FORCE)
set(HERMES_ENABLE_DEBUGGER OFF CACHE BOOL "" FORCE)
set(HERMES_MEMORY_INSTRUMENTATION OFF CACHE BOOL "" FORCE)
set(HERMES_ENABLE_INTL OFF CACHE BOOL "" FORCE)
set(HERMES_UNICODE_LITE ON CACHE BOOL "" FORCE)
set(HERMES_BUILD_SHARED_JSI OFF CACHE BOOL "" FORCE)
set(HERMES_BUILD_APPLE_FRAMEWORK OFF CACHE BOOL "" FORCE)

# Hermes 0.13 uses _WINDOWS rather than the compiler-provided _WIN32 guard.
if(MINGW)
	add_compile_definitions(_WINDOWS _USE_MATH_DEFINES)
endif()

add_subdirectory("${HERMES_SOURCE_DIR}" "${CMAKE_BINARY_DIR}/hermes" EXCLUDE_FROM_ALL)

# The pinned LLVH snapshot relies on MSVC's implicit source include path.
# Clang-MinGW needs the same path declared explicitly for WindowsSupport.h.
if(MINGW AND TARGET LLVHSupport)
	target_include_directories(LLVHSupport PRIVATE "${HERMES_SOURCE_DIR}/external/llvh/lib/Support")
endif()

# LLVH 8 expects MSVC to provide these atomic helpers. Clang-MinGW needs the
# compatibility translation unit in both the build-time compiler and runtime.
if(MINGW AND TARGET hermesc)
	target_sources(hermesc PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}/src/llvh_mingw_compat.cpp")
	target_include_directories(hermesc PRIVATE "${HERMES_SOURCE_DIR}/external/llvh/include")
endif()

add_executable(roborock-hermes-appplugin-host src/main.cpp)
target_compile_features(roborock-hermes-appplugin-host PRIVATE cxx_std_17)
target_link_libraries(roborock-hermes-appplugin-host PRIVATE libhermes)
if(MINGW)
	target_sources(roborock-hermes-appplugin-host PRIVATE src/llvh_mingw_compat.cpp)
	target_include_directories(roborock-hermes-appplugin-host PRIVATE "${HERMES_SOURCE_DIR}/external/llvh/include")
endif()

if(MSVC)
	target_compile_options(roborock-hermes-appplugin-host PRIVATE /W4 /permissive-)
else()
	target_compile_options(roborock-hermes-appplugin-host PRIVATE -Wall -Wextra -Wpedantic)
endif()
