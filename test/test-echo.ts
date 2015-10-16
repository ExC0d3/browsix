/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

'use strict';

import * as chai from 'chai';
import { Boot, Kernel } from '../lib/kernel/kernel';

const expect = chai.expect;

const MINS = 60 * 1000; // milliseconds

const IS_KARMA = typeof window !== 'undefined' && typeof (<any>window).__karma__ !== 'undefined';
const ROOT = IS_KARMA ? '/base/fs/' : '/fs/';

const NODE = '/usr/bin/node';
const ECHO = '/usr/bin/echo';

export const name = 'test-echo';

describe('echo a b c', function(): void {
	this.timeout(10 * MINS);

	const A_CONTENTS = 'contents of a';
	const B_CONTENTS = 'wish you were here';
	let kernel: Kernel = null;

	it('should boot', function(done: MochaDone): void {
		Boot('XmlHttpRequest', ['index.json', ROOT, true], function(err: any, freshKernel: Kernel): void {
			expect(err).to.be.null;
			expect(freshKernel).not.to.be.null;
			kernel = freshKernel;
			done();
		});
	});

	it('should run `echo a b c`', function(done: MochaDone): void {
		kernel.system(NODE + ' ' + ECHO + ' a b   c', echoExited);
		function echoExited(code: number, stdout: string, stderr: string): void {
			try {
				expect(code).to.equal(0);
				expect(stdout).to.equal('a b c\n');
				expect(stderr).to.equal('');
				done();
			} catch (e) {
				done(e);
			}
		}
	});
});