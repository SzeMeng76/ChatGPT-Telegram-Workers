# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **🤝 Bot API 10.0 Bot-to-Bot Support**: Optional Bot-to-Bot communication mode
  - New `ENABLE_BOT_TO_BOT` flag to accept messages from other bots
  - New `ALLOWED_BOT_IDS` allowlist to prevent loops and abuse (strongly recommended)
  - `BotToBotFilter` middleware: blocks bot messages by default, drops self-loops, enforces the allowlist
  - Requires enabling Bot-to-Bot Mode in @BotFather MiniApp
- **🎬 Google Veo 3.0 Support**: Upgraded video generation with native audio capabilities
  - Native audio generation with synchronized sound effects, dialogue, and music
  - Enhanced video quality with 8-second 720p generation
  - Support for negative prompts to exclude unwanted elements
  - Fast generation mode with `veo-3.0-fast-generate-preview`
- Enhanced documentation with comprehensive guides
- Advanced deployment configurations
- Performance monitoring and analytics integration

### Changed
- **Google Veo API**: Updated from Veo 2.0 to Veo 3.0 Fast
  - Fixed `personGeneration` parameter for text-to-video compatibility
  - Removed `durationSeconds` parameter (fixed 8-second videos)
  - Improved API request structure and error handling
- Improved error handling and logging
- Enhanced security practices documentation

### Fixed
- **AI SDK Compatibility**: Resolved conflicts with latest AI SDK versions
- **Veo 3.0 Parameters**: Fixed unsupported parameter issues
- **Request Processing**: Enhanced TypeScript type safety for streaming responses

---

## [2.0.0] - 2024-12-01

### 🎉 Major Release - Complete Refactor

This release represents a complete architectural overhaul with modern technologies and enhanced capabilities.

### Added
- **AI SDK Integration**: Unified interface for multiple AI providers
- **Enhanced AI Provider Support**:
  - OpenAI (GPT-4, GPT-4 Turbo, GPT-3.5)
  - Anthropic Claude (Haiku, Sonnet, Opus)
  - Google Gemini (Pro, Flash)
  - xAI Grok
  - Mistral AI
  - Cohere
  - Google Vertex AI
- **Function Calling System**: Advanced tool integration
- **Model Context Protocol (MCP)**: Extensible tool ecosystem
- **Modern Build System**: Vite + TypeScript configuration
- **Docker Support**: Complete containerization with multi-stage builds
- **Health Check Endpoints**: System monitoring and diagnostics
- **Enhanced Security**: Input validation and rate limiting
- **Streaming Responses**: Real-time AI response streaming
- **Multi-Platform Deployment**: Docker, Vercel, Railway, Render, Koyeb
- **Advanced Configuration**: Environment-based config management
- **Error Recovery**: Robust error handling and retry mechanisms
- **Performance Optimization**: Caching and response optimization

### Changed
- **Breaking Change**: Complete rewrite requires new configuration setup
- **TypeScript Migration**: Full TypeScript codebase for better reliability
- **Modular Architecture**: Plugin-based system for extensibility
- **Configuration Format**: New TOML-based configuration system
- **Database Schema**: Enhanced data models for better performance
- **API Responses**: Improved response formatting and error messages

### Deprecated
- Legacy single-file deployment (still supported in compatibility mode)
- Old environment variable format (migration guide provided)

### Removed
- **Breaking Change**: Role-based system (replaced with custom commands)
- Legacy AI provider integrations (replaced with AI SDK)
- Outdated deployment methods

### Fixed
- Memory leaks in long-running conversations
- Token calculation accuracy
- Message editing reliability
- Group chat permission handling
- Rate limiting bypass vulnerabilities

### Security
- Enhanced input sanitization
- Improved token validation
- Secure environment variable handling
- Advanced rate limiting algorithms

---

## [1.9.0] - 2024-06-15

### Added
- **Plugin System**: Extensible architecture for custom functionality
- Plugin API documentation
- Example plugins for common use cases

### Changed
- Improved plugin loading mechanism
- Enhanced configuration validation

### Fixed
- Plugin initialization race conditions
- Memory usage optimization

---

## [1.8.0] - 2024-05-20

### Added
- **Cohere AI Support**: Integration with Cohere's language models
- **Anthropic AI Enhanced**: Full Claude model family support
- **Image Input Processing**: Multi-modal AI conversations
- **Group Topic Mode**: Telegram group topic compatibility
- **Custom Commands**: Flexible command system replacing roles

### Changed
- Replaced role functionality with more flexible custom commands
- Improved image processing pipeline
- Enhanced group chat handling

### Removed
- Legacy role system (replaced with custom commands)

### Fixed
- **Critical**: Super long text sending failures
- Image processing memory leaks
- Group permission edge cases

---

## [1.7.0] - 2024-04-10

### Added
- **Worker AI API Integration**: New API-based calling method
- **Conversation Flow Mode**: Enhanced dialogue management
- **Text-to-Image Generation**: AI-powered image creation
- **AI Provider Switching**: Dynamic provider selection
- **Custom Commands**: Quick model switching capabilities
- **User Configuration Lock**: Prevent unauthorized config changes

### Changed
- **Breaking Change**: Worker AI now requires account_id and token setup
- Enhanced streaming text processing
- Improved model switching interface

### Deprecated
- Legacy Worker AI binding method (will be removed in v2.0.0)

### Fixed
- Provider switching reliability
- Configuration persistence issues

---

## [1.6.0] - 2024-03-15

### Added
- **Workers AI Support**: Full Cloudflare Workers AI integration
- Enhanced streaming mode parser for OpenAI

### Changed
- Optimized AI response processing
- Improved error handling for AI failures

### Fixed
- OpenAI streaming parser edge cases
- Token usage calculation accuracy

---

## [1.5.0] - 2024-02-20

### Added
- **Streaming Output**: Real-time response streaming (enabled by default)
- **Multiple API Keys**: Random key selection for load balancing
- **Shortcut Buttons**: Quick access to `/new` and `/redo` commands
- Loading messages for better user experience

### Changed
- Reordered command priority for better UX
- Improved response time feedback

### Fixed
- Key rotation reliability
- Streaming connection stability

---

## [1.4.0] - 2024-01-25

### Added
- **Multi-Platform Deployment**: Support for various hosting platforms
- **Redo Command**: `/redo` for resending/modifying previous questions
- **Multi-Language Support**: English, Simplified Chinese, Traditional Chinese
- **Environment Management**: `/delenv` command for resetting configurations

### Changed
- Enhanced deployment documentation
- Improved language detection and switching

### Fixed
- Configuration persistence across deployments
- Language switching reliability

---

## [1.3.1] - 2024-01-10

### Changed
- Optimized history trimming algorithm
- Improved token calculation precision
- Enhanced message editing reliability

### Fixed
- Message editing edge cases
- History management memory usage
- Token counting accuracy

---

## [1.3.0] - 2024-01-05

### Added
- **Usage Statistics**: `/usage` command for token tracking
- **System Information**: `/system` command for diagnostics
- **Command Menu Scoping**: Configurable command visibility
- **Environment Variables**: `SYSTEM_INIT_MESSAGE` and `CHAT_MODEL`
- **GitHub Actions**: Automated deployment pipeline
- Enhanced `/init` page with detailed error reporting

### Changed
- Improved configuration loading mechanism
- Enhanced error message detail

### Fixed
- **Critical**: History record trimming bugs
- **Critical**: `USER_CONFIG` loading exceptions
- **Critical**: Error message storage in history
- Configuration validation edge cases

---

## [1.2.0] - 2023-12-15

### Security
- **Critical Security Fix**: Patched high-severity vulnerability
- **Mandatory Update**: All users must update immediately

### Fixed
- Authentication bypass vulnerability
- Input validation security holes

---

## [1.1.0] - 2023-12-01

### Added
- **Multi-File Architecture**: Modular codebase for easier maintenance
- **Distribution Directory**: Pre-built files for easy deployment
- **Compatibility Layer**: Smooth migration from v1.0.x
- **Automatic Command Binding**: Self-registering command system
- **Group Whitelist**: `CHAT_GROUP_WHITE_LIST` security feature

### Changed
- **Breaking Change**: Group ID must be whitelisted for security
- Restructured codebase from single to multiple files
- Modified KV key generation logic
- Updated configuration format with backward compatibility

### Deprecated
- Single-file deployment method
- Legacy configuration format (compatibility provided)

### Fixed
- Various stability issues
- Memory leaks in long-running instances
- Command registration reliability

### Security
- **Breaking Change**: Mandatory group whitelisting to prevent quota abuse

---

## [1.0.0] - 2023-11-15

### Added
- Initial release
- Basic ChatGPT integration
- Telegram bot functionality
- Cloudflare Workers deployment
- Simple configuration system
- Core command set (`/start`, `/new`, `/init`)

---

## Migration Guides

### Upgrading from v1.x to v2.0.0

This is a major release with breaking changes. Please follow our [Migration Guide](MIGRATION.md) for detailed upgrade instructions.

**Key Steps:**
1. Backup your current configuration
2. Update environment variables to new format
3. Migrate custom commands from role system
4. Test deployment in staging environment
5. Update production deployment

### Upgrading from v1.8.x to v1.9.0

Plugin system introduction requires:
1. Review custom modifications for plugin compatibility
2. Install desired plugins from the official plugin registry
3. Update configuration to enable plugin system

---

## Support

- 📖 **Documentation**: [Full Documentation](../README.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/discussions)
- 📧 **Security Issues**: Please report privately to maintainers

---

**Legend:**
- 🎉 Major features
- ⚠️ Breaking changes
- 🔒 Security updates
- 🐛 Bug fixes
- 📈 Performance improvements
