import { expect } from 'chai';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ExportsModule } from '../src/exports/exports.module';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UnknownExportException } from '@nestjs/core/errors/exceptions/unknown-export.exception';
import { UndefinedDependencyException } from '@nestjs/core/errors/exceptions/undefined-dependency.exception';
import { InjectModule } from '../src/inject/inject.module';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

describe('Injector', () => {
  describe('when "providers" and "exports" properties are inconsistent', () => {
    it(`should fail with "UnknownExportException"`, async () => {
      try {
        const builder = Test.createTestingModule({
          imports: [ExportsModule],
        });
        await builder.compile();
      } catch (err) {
        expect(err).to.be.instanceof(UnknownExportException);
      }
    });
  });

  describe('when Nest cannot resolve dependencies', () => {
    it(`should fail with "RuntimeException"`, async () => {
      try {
        const builder = Test.createTestingModule({
          imports: [InjectModule],
        });
        await builder.compile();
      } catch (err) {
        expect(err).to.be.instanceof(RuntimeException);
      }
    });
  });
});
