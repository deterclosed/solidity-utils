const { expectRevert } = require('@openzeppelin/test-helpers');

const RevertReasonParserTest = artifacts.require('RevertReasonParserTest');

describe('RevertReasonParser', async () => {
    before(async function () {
        this.RevertReasonParserTest = await RevertReasonParserTest.new();
    });

    describe('parse', async function () {
        it('should be reverted with Invalid revert reason', async function () {
            await expectRevert(
                this.RevertReasonParserTest.testParseWithThrow(),
                'Invalid revert reason',
            );
        });

        it('should be parsed as empty Error', async function () {
            await this.RevertReasonParserTest.testEmptyStringRevert();
        });

        it('should be parsed as Error', async function () {
            await this.RevertReasonParserTest.testNonEmptyRevert();
        });

        it('should be parsed as Unknown', async function () {
            await this.RevertReasonParserTest.testEmptyRevert();
        });

        it('should be parsed as Panic', async function () {
            await this.RevertReasonParserTest.testAssertion();
        });

        it('should be parsed as Error with long string', async function () {
            await this.RevertReasonParserTest.testLongStringRevert();
        });

        it('should be reverted in _test()', async function () {
            await expectRevert(
                this.RevertReasonParserTest.testWithThrow(),
                'testFunctions without throw',
            );
        });
    });
});